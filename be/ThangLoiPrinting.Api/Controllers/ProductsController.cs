using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Api.Attributes;
using ThangLoiPrinting.Application.DTOs.Products;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET: /api/products?categoryId=1&keyword=card&page=1&pageSize=15
    /// Lấy danh sách sản phẩm có hỗ trợ lọc theo danh mục, tìm kiếm và phân trang
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int? categoryId,
        [FromQuery] string? keyword,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 15)
    {
        var query = _context.Products.AsNoTracking().AsQueryable();

        // 1. Lọc theo danh mục
        if (categoryId.HasValue && categoryId.Value > 0)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        // 2. Tìm kiếm theo từ khóa
        if (!string.IsNullOrWhiteSpace(keyword))
        {
            var search = keyword.Trim().ToLower();
            query = query.Where(p => p.Title.ToLower().Contains(search) || 
                                     (p.Description != null && p.Description.ToLower().Contains(search)));
        }

        // 3. Tổng số sản phẩm thỏa mãn điều kiện
        var totalCount = await query.CountAsync();

        // 4. Phân trang
        var products = await query
            .OrderBy(p => p.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new
            {
                p.Id,
                p.Title,
                p.Slug,
                p.Image,
                p.Price,
                PriceFormatted = string.Format("{0:N0} đ", p.Price),
                p.PriceUnit,
                p.Sku,
                p.CategoryId,
                CategoryName = p.Category != null ? p.Category.Name : null,
                p.CreatedAt
            })
            .ToListAsync();

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy danh sách sản phẩm thành công",
            data = products,
            meta = new
            {
                page,
                pageSize,
                totalCount,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            }
        });
    }

    /// <summary>
    /// GET: /api/products/1
    /// Lấy chi tiết một sản phẩm theo ID (trả về cả Specifications dạng JSON từ DB)
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new
            {
                success = false,
                statusCode = 404,
                message = $"Không tìm thấy sản phẩm có ID = {id}"
            });
        }

        // Parse chuỗi JSON Specifications từ database thành đối tượng trả về cho Frontend
        object? specs = null;
        if (!string.IsNullOrWhiteSpace(product.Specifications))
        {
            try
            {
                specs = JsonSerializer.Deserialize<object>(product.Specifications);
            }
            catch
            {
                // Nếu không parse được thì giữ nguyên
                specs = null;
            }
        }

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy chi tiết sản phẩm thành công",
            data = new
            {
                product.Id,
                product.Title,
                product.Slug,
                product.Image,
                product.Price,
                PriceFormatted = string.Format("{0:N0} đ", product.Price),
                product.PriceUnit,
                product.Sku,
                product.Description,
                product.CategoryId,
                Category = product.Category != null ? new { product.Category.Id, product.Category.Name, product.Category.Slug } : null,
                Specifications = specs,
                product.CreatedAt
            }
        });
    }

    /// <summary>
    /// GET: /api/products/1/related?limit=4
    /// Gợi ý sản phẩm liên quan ưu tiên cùng CategoryId, bổ sung từ danh mục khác nếu chưa đủ số lượng
    /// </summary>
    [HttpGet("{id:int}/related")]
    public async Task<IActionResult> GetRelated(int id, [FromQuery] int limit = 4)
    {
        var current = await _context.Products
            .AsNoTracking()
            .Select(p => new { p.Id, p.CategoryId })
            .FirstOrDefaultAsync(p => p.Id == id);

        if (current == null)
        {
            return NotFound(new
            {
                success = false,
                statusCode = 404,
                message = $"Không tìm thấy sản phẩm có ID = {id}"
            });
        }

        var safeLimit = Math.Clamp(limit, 1, 12);

        // 1. Ưu tiên lấy sản phẩm cùng CategoryId (trừ sản phẩm hiện tại)
        var related = await _context.Products
            .AsNoTracking()
            .Where(p => p.Id != id && p.CategoryId == current.CategoryId)
            .OrderBy(p => p.Id)
            .Take(safeLimit)
            .Select(p => new
            {
                p.Id,
                p.Title,
                p.Slug,
                p.Image,
                p.Price,
                PriceFormatted = string.Format("{0:N0} đ", p.Price),
                p.PriceUnit,
                p.CategoryId,
                SameCategory = true
            })
            .ToListAsync();

        // 2. Nếu cùng danh mục chưa đủ số lượng (vd chỉ có 2-3 sản phẩm), bổ sung thêm từ danh mục khác
        if (related.Count < safeLimit)
        {
            var excludeIds = related.Select(r => r.Id).Append(id).ToList();
            var remaining = safeLimit - related.Count;

            var extras = await _context.Products
                .AsNoTracking()
                .Where(p => !excludeIds.Contains(p.Id))
                .OrderBy(p => p.Id)
                .Take(remaining)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Slug,
                    p.Image,
                    p.Price,
                    PriceFormatted = string.Format("{0:N0} đ", p.Price),
                    p.PriceUnit,
                    p.CategoryId,
                    SameCategory = false
                })
                .ToListAsync();

            related.AddRange(extras);
        }

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy danh sách sản phẩm liên quan thành công",
            data = related
        });
    }

    /// <summary>
    /// POST: /api/products (Chỉ Admin)
    /// Thêm sản phẩm mới
    /// </summary>
    [HttpPost]
    [Authorize]
    [AdminOnly]
    public async Task<IActionResult> Create([FromBody] ProductUpsertDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { success = false, statusCode = 400, message = "Dữ liệu sản phẩm không hợp lệ", errors = ModelState });
        }

        var title = dto.Title.Trim();
        var slug = string.IsNullOrWhiteSpace(dto.Slug)
            ? title.ToLower().Replace(" ", "-")
            : dto.Slug.Trim();

        var product = new Product
        {
            Title = title,
            Slug = slug,
            Image = string.IsNullOrWhiteSpace(dto.Image) ? "/uploads/products/p1.png" : dto.Image.Trim(),
            Price = dto.Price,
            PriceUnit = string.IsNullOrWhiteSpace(dto.PriceUnit) ? "/hộp" : dto.PriceUnit.Trim(),
            Sku = dto.Sku?.Trim(),
            Description = dto.Description?.Trim(),
            CategoryId = dto.CategoryId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return StatusCode(201, new
        {
            success = true,
            statusCode = 201,
            message = "Thêm sản phẩm mới thành công",
            data = new { product.Id, product.Title, product.Price, product.PriceUnit }
        });
    }

    /// <summary>
    /// PUT: /api/products/1 (Chỉ Admin)
    /// Cập nhật sản phẩm & giá tham khảo
    /// </summary>
    [HttpPut("{id:int}")]
    [Authorize]
    [AdminOnly]
    public async Task<IActionResult> Update(int id, [FromBody] ProductUpsertDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { success = false, statusCode = 400, message = "Dữ liệu sản phẩm không hợp lệ", errors = ModelState });
        }

        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            return NotFound(new { success = false, statusCode = 404, message = $"Không tìm thấy sản phẩm ID = {id}" });
        }

        product.Title = dto.Title.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Slug)) product.Slug = dto.Slug.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Image)) product.Image = dto.Image.Trim();
        product.Price = dto.Price;
        product.PriceUnit = string.IsNullOrWhiteSpace(dto.PriceUnit) ? "/hộp" : dto.PriceUnit.Trim();
        product.Sku = dto.Sku?.Trim();
        product.Description = dto.Description?.Trim();
        product.CategoryId = dto.CategoryId;

        await _context.SaveChangesAsync();

        return Ok(new { success = true, statusCode = 200, message = "Cập nhật sản phẩm thành công" });
    }

    /// <summary>
    /// DELETE: /api/products/1 (Chỉ Admin)
    /// Xóa sản phẩm
    /// </summary>
    [HttpDelete("{id:int}")]
    [Authorize]
    [AdminOnly]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            return NotFound(new { success = false, statusCode = 404, message = $"Không tìm thấy sản phẩm ID = {id}" });
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, statusCode = 200, message = "Xóa sản phẩm thành công" });
    }
}
