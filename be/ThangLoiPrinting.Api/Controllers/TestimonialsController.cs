using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TestimonialsController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET: /api/testimonials
    /// Lấy danh sách đánh giá của khách hàng (dải tím Trang chủ)
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var testimonials = await _context.Testimonials
            .AsNoTracking()
            .OrderBy(t => t.DisplayOrder)
            .ThenByDescending(t => t.CreatedAt)
            .Select(t => new
            {
                t.Id,
                t.Name,
                t.Role,
                t.Avatar,
                t.Quote,
                t.Rating,
                t.DisplayOrder,
                t.CreatedAt
            })
            .ToListAsync();

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy danh sách đánh giá thành công",
            data = testimonials
        });
    }
}
