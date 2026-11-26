using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Api.Attributes;
using ThangLoiPrinting.Application.DTOs.News;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly AppDbContext _context;

    public NewsController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET: /api/news?page=1&pageSize=6
    /// Lấy danh sách tin tức (phục vụ cả Trang chủ và Trang danh sách tin tức)
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = _context.News.AsNoTracking().OrderByDescending(n => n.PublishedAt);

        var totalCount = await query.CountAsync();
        var allNews = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(n => new
            {
                n.Id,
                n.Title,
                n.Slug,
                Desc = n.Summary,
                n.Summary,
                n.Image,
                n.IsFeatured,
                n.Views,
                CreatedAt = n.PublishedAt.ToString("yyyy-MM-dd"),
                PublishedAt = n.PublishedAt
            })
            .ToListAsync();

        // 1. Bài tiêu điểm (cho trang chủ)
        var featured = allNews.FirstOrDefault(n => n.IsFeatured) ?? allNews.FirstOrDefault();

        // 2. 3 bài viết tiếp theo (cho trang chủ)
        var articles = allNews
            .Where(n => featured == null || n.Id != featured.Id)
            .Take(3)
            .ToList();

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy tin tức thành công",
            data = new
            {
                featured,
                articles,
                items = allNews,
                meta = new
                {
                    page,
                    pageSize,
                    totalCount,
                    totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
                }
            }
        });
    }

    /// <summary>
    /// GET: /api/news/1
    /// Lấy chi tiết một bài viết tin tức kèm bài viết liên quan
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var news = await _context.News.FirstOrDefaultAsync(n => n.Id == id);

        if (news == null)
        {
            return NotFound(new
            {
                success = false,
                statusCode = 404,
                message = $"Không tìm thấy tin tức có ID = {id}"
            });
        }

        // Tăng lượt xem bài viết
        news.Views += 1;
        await _context.SaveChangesAsync();

        // Lấy 3 bài viết liên quan khác
        var relatedNews = await _context.News
            .AsNoTracking()
            .Where(n => n.Id != id)
            .OrderByDescending(n => n.PublishedAt)
            .Take(3)
            .Select(n => new
            {
                n.Id,
                n.Title,
                n.Slug,
                Desc = n.Summary,
                n.Image,
                n.Views,
                CreatedAt = n.PublishedAt.ToString("yyyy-MM-dd")
            })
            .ToListAsync();

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy chi tiết tin tức thành công",
            data = new
            {
                news.Id,
                news.Title,
                news.Slug,
                news.Summary,
                news.Content,
                news.Image,
                news.IsFeatured,
                news.Views,
                CreatedAt = news.PublishedAt.ToString("yyyy-MM-dd"),
                PublishedAt = news.PublishedAt,
                Related = relatedNews
            }
        });
    }

    /// <summary>
    /// POST: /api/news (Chỉ Admin)
    /// Thêm bài viết tin tức mới
    /// </summary>
    [HttpPost]
    [Authorize]
    [AdminOnly]
    public async Task<IActionResult> Create([FromBody] NewsUpsertDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { success = false, statusCode = 400, message = "Dữ liệu bài viết không hợp lệ", errors = ModelState });
        }

        var title = dto.Title.Trim();
        var article = new News
        {
            Title = title,
            Slug = string.IsNullOrWhiteSpace(dto.Slug) ? title.ToLower().Replace(" ", "-") : dto.Slug.Trim(),
            Summary = dto.Summary.Trim(),
            Content = dto.Content?.Trim(),
            Image = string.IsNullOrWhiteSpace(dto.Image) ? "/uploads/news/news-1.png" : dto.Image.Trim(),
            IsFeatured = dto.IsFeatured,
            PublishedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow
        };

        _context.News.Add(article);
        await _context.SaveChangesAsync();

        return StatusCode(201, new
        {
            success = true,
            statusCode = 201,
            message = "Thêm bài viết thành công",
            data = new { article.Id, article.Title }
        });
    }

    /// <summary>
    /// PUT: /api/news/1 (Chỉ Admin)
    /// Cập nhật bài viết tin tức
    /// </summary>
    [HttpPut("{id:int}")]
    [Authorize]
    [AdminOnly]
    public async Task<IActionResult> Update(int id, [FromBody] NewsUpsertDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { success = false, statusCode = 400, message = "Dữ liệu bài viết không hợp lệ", errors = ModelState });
        }

        var article = await _context.News.FirstOrDefaultAsync(n => n.Id == id);
        if (article == null)
        {
            return NotFound(new { success = false, statusCode = 404, message = $"Không tìm thấy bài viết ID = {id}" });
        }

        article.Title = dto.Title.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Slug)) article.Slug = dto.Slug.Trim();
        article.Summary = dto.Summary.Trim();
        article.Content = dto.Content?.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Image)) article.Image = dto.Image.Trim();
        article.IsFeatured = dto.IsFeatured;

        await _context.SaveChangesAsync();

        return Ok(new { success = true, statusCode = 200, message = "Cập nhật bài viết thành công" });
    }

    /// <summary>
    /// DELETE: /api/news/1 (Chỉ Admin)
    /// Xóa bài viết tin tức
    /// </summary>
    [HttpDelete("{id:int}")]
    [Authorize]
    [AdminOnly]
    public async Task<IActionResult> Delete(int id)
    {
        var article = await _context.News.FirstOrDefaultAsync(n => n.Id == id);
        if (article == null)
        {
            return NotFound(new { success = false, statusCode = 404, message = $"Không tìm thấy bài viết ID = {id}" });
        }

        _context.News.Remove(article);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, statusCode = 200, message = "Xóa bài viết thành công" });
    }
}
