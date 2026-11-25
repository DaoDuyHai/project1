using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
}
