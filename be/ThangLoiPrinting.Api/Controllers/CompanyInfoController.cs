using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Api.Attributes;
using ThangLoiPrinting.Application.DTOs.Company;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/company-info")]
public class CompanyInfoController : ControllerBase
{
    private readonly AppDbContext _context;

    public CompanyInfoController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET: /api/company-info
    /// Lấy thông tin cấu hình doanh nghiệp (Hotline, Địa chỉ, Email, Bản quyền...)
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var info = await _context.CompanyInfo
            .AsNoTracking()
            .OrderBy(c => c.Id)
            .Select(c => new
            {
                c.Id,
                Name = c.CompanyName,
                c.ShortName,
                c.Slogan,
                c.Address,
                c.Hotline,
                c.Email,
                c.FacebookUrl,
                c.YoutubeUrl,
                c.Copyright,
                c.UpdatedAt
            })
            .FirstOrDefaultAsync();

        if (info == null)
        {
            return NotFound(new
            {
                success = false,
                statusCode = 404,
                message = "Chưa có dữ liệu thông tin doanh nghiệp trong hệ thống"
            });
        }

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Lấy thông tin doanh nghiệp thành công",
            data = info
        });
    }

    /// <summary>
    /// PUT: /api/company-info (Chỉ Admin)
    /// Cập nhật thông tin doanh nghiệp (Hotline, Địa chỉ, Email, Slogan...)
    /// </summary>
    [HttpPut]
    [Authorize]
    [AdminOnly]
    public async Task<IActionResult> Update([FromBody] CompanyInfoUpdateDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { success = false, statusCode = 400, message = "Dữ liệu không hợp lệ", errors = ModelState });
        }

        var info = await _context.CompanyInfo.OrderBy(c => c.Id).FirstOrDefaultAsync();
        if (info == null)
        {
            return NotFound(new { success = false, statusCode = 404, message = "Chưa có dữ liệu thông tin doanh nghiệp để cập nhật" });
        }

        info.CompanyName = dto.CompanyName.Trim();
        info.ShortName = dto.ShortName.Trim();
        info.Slogan = dto.Slogan.Trim();
        info.Address = dto.Address.Trim();
        info.Hotline = dto.Hotline.Trim();
        info.Email = dto.Email.Trim();
        info.FacebookUrl = dto.FacebookUrl?.Trim();
        info.YoutubeUrl = dto.YoutubeUrl?.Trim();
        info.Copyright = dto.Copyright.Trim();
        info.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Cập nhật thông tin công ty thành công"
        });
    }
}
