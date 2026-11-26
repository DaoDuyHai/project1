using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientsController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET: /api/clients
    /// Lấy danh sách đối tác, khách hàng tiêu biểu đang hoạt động
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clients = await _context.Clients
            .AsNoTracking()
            .Where(c => c.IsActive)
            .OrderBy(c => c.DisplayOrder)
            .ThenBy(c => c.Id)
            .Select(c => new
            {
                c.Id,
                c.Name,
                Logo = c.LogoUrl,
                c.WebsiteUrl,
                c.DisplayOrder
            })
            .ToListAsync();

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy danh sách đối tác thành công",
            data = clients
        });
    }
}
