using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThangLoiPrinting.Application.DTOs.Auth;
using ThangLoiPrinting.Application.Interfaces;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// POST: /api/auth/login
    /// Đăng nhập tài khoản quản trị (trả về JWT Bearer Token)
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                statusCode = 400,
                message = "Dữ liệu đăng nhập không hợp lệ",
                errors = ModelState
            });
        }

        var result = await _authService.LoginAsync(request, ct);
        if (result == null)
        {
            return Unauthorized(new
            {
                success = false,
                statusCode = 401,
                message = "Tên đăng nhập hoặc mật khẩu không chính xác."
            });
        }

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Đăng nhập thành công",
            data = result
        });
    }

    /// <summary>
    /// GET: /api/auth/me
    /// Xác thực token hiện tại và lấy thông tin tài khoản đang đăng nhập
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetMe(CancellationToken ct)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                success = false,
                statusCode = 401,
                message = "Token không hợp lệ."
            });
        }

        var profile = await _authService.GetProfileAsync(userId, ct);
        if (profile == null)
        {
            return Unauthorized(new
            {
                success = false,
                statusCode = 401,
                message = "Tài khoản không tồn tại hoặc đã bị khóa."
            });
        }

        return Ok(new
        {
            success = true,
            statusCode = 200,
            message = "Xác thực thành công",
            data = profile
        });
    }
}
