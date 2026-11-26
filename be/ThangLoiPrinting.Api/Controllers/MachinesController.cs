using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MachinesController : ControllerBase
{
    private readonly AppDbContext _context;

    public MachinesController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET: /api/machines?category=In Offset
    /// Lấy danh sách hệ thống máy móc thiết bị của xưởng in Thắng Lợi
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? category)
    {
        var query = _context.Machines
            .AsNoTracking()
            .Where(m => m.IsActive)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && !category.Equals("all", StringComparison.OrdinalIgnoreCase))
        {
            var cat = category.Trim();
            query = query.Where(m => m.CategoryTag == cat);
        }

        var rawMachines = await query
            .OrderBy(m => m.DisplayOrder)
            .ThenBy(m => m.Id)
            .ToListAsync();

        var machines = rawMachines.Select(m => new
        {
            m.Id,
            m.Name,
            m.ModelCode,
            m.Brand,
            m.Origin,
            m.CategoryTag,
            m.ImageUrl,
            m.Description,
            Specifications = ParseSpecifications(m.Specifications),
            m.DisplayOrder,
            m.CreatedAt
        });

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy danh sách hệ thống máy móc thành công",
            data = machines
        });
    }

    private static object? ParseSpecifications(string? rawSpecs)
    {
        if (string.IsNullOrWhiteSpace(rawSpecs)) return null;
        try
        {
            return JsonSerializer.Deserialize<object>(rawSpecs);
        }
        catch
        {
            return null;
        }
    }
}
