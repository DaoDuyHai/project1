using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
}
