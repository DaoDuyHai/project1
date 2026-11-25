using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Application.DTOs;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET: /api/quotes
    /// Lấy danh sách tất cả yêu cầu báo giá (dành cho Quản trị viên)
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var quotes = await _context.Quotes
            .AsNoTracking()
            .Include(q => q.Product)
            .OrderByDescending(q => q.CreatedAt)
            .Select(q => new
            {
                q.Id,
                q.FullName,
                q.PhoneNumber,
                q.Email,
                q.ProductId,
                ProductTitle = q.Product != null ? q.Product.Title : null,
                q.Quantity,
                q.Notes,
                q.Status,
                CreatedAt = q.CreatedAt.ToString("yyyy-MM-dd HH:mm")
            })
            .ToListAsync();

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy danh sách yêu cầu báo giá thành công",
            data = quotes
        });
    }

    /// <summary>
    /// POST: /api/quotes
    /// Khách hàng gửi yêu cầu báo giá từ Website
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateQuoteDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                statusCode = 400,
                message = "Dữ liệu không hợp lệ",
                errors = ModelState
            });
        }

        var quote = new Quote
        {
            FullName = dto.FullName.Trim(),
            PhoneNumber = dto.PhoneNumber.Trim(),
            Email = dto.Email?.Trim(),
            ProductId = dto.ProductId,
            Quantity = dto.Quantity > 0 ? dto.Quantity : 100,
            Notes = dto.Notes?.Trim(),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return StatusCode(201, new
        {
            success = true,
            statusCode = 201,
            message = "Gửi yêu cầu báo giá thành công! Xưởng In Thắng Lợi sẽ liên hệ lại với bạn trong ít phút.",
            data = new
            {
                quote.Id,
                quote.FullName,
                quote.PhoneNumber,
                quote.CreatedAt
            }
        });
    }
}
