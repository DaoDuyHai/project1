using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThangLoiPrinting.Application.DTOs;
using ThangLoiPrinting.Application.DTOs.Quotes;
using ThangLoiPrinting.Application.Interfaces;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly IQuoteService _quoteService;

    public QuotesController(IQuoteService quoteService)
    {
        _quoteService = quoteService;
    }

    /// <summary>
    /// GET: /api/quotes?status=Pending
    /// Lấy danh sách yêu cầu báo giá (Bắt buộc đăng nhập Admin hoặc Staff)
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Admin,Staff")]
    public async Task<IActionResult> GetAll([FromQuery] string? status, CancellationToken ct)
    {
        var quotes = await _quoteService.GetQuotesAsync(status, ct);

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
    /// Khách hàng gửi yêu cầu báo giá từ Website (Công khai - không cần đăng nhập)
    /// </summary>
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Create([FromBody] CreateQuoteDto dto, CancellationToken ct)
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

        var quote = await _quoteService.CreateQuoteAsync(dto, ct);

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

    /// <summary>
    /// PATCH: /api/quotes/1/status
    /// Cập nhật trạng thái xử lý yêu cầu báo giá (Bắt buộc đăng nhập Admin hoặc Staff)
    /// </summary>
    [HttpPatch("{id:int}/status")]
    [Authorize(Roles = "Admin,Staff")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateQuoteStatusDto dto, CancellationToken ct)
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

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        int? handledByUserId = int.TryParse(userIdClaim, out var uid) ? uid : null;

        var updated = await _quoteService.UpdateStatusAsync(id, dto.Status, handledByUserId, ct);
        if (!updated)
        {
            return NotFound(new
            {
                success = false,
                statusCode = 404,
                message = $"Không tìm thấy yêu cầu báo giá ID = {id}"
            });
        }

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Cập nhật trạng thái báo giá thành công"
        });
    }
}
