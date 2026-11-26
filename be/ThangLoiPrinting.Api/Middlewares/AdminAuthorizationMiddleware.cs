using System.Net;
using System.Text.Json;
using ThangLoiPrinting.Api.Attributes;

namespace ThangLoiPrinting.Api.Middlewares;

/// <summary>
/// Middleware kiểm tra phân quyền Admin tập trung trước khi cho phép thực thi
/// các thao tác quản trị hệ thống (Thêm/Sửa/Xóa Sản phẩm, Tin tức, Thông tin công ty).
/// </summary>
public class AdminAuthorizationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<AdminAuthorizationMiddleware> _logger;

    public AdminAuthorizationMiddleware(RequestDelegate next, ILogger<AdminAuthorizationMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var endpoint = context.GetEndpoint();
        var requiresAdmin = endpoint?.Metadata.GetMetadata<AdminOnlyAttribute>() != null;

        if (requiresAdmin)
        {
            if (context.User.Identity?.IsAuthenticated != true)
            {
                await WriteErrorAsync(
                    context,
                    HttpStatusCode.Unauthorized,
                    "Bạn cần đăng nhập để truy cập tài nguyên quản trị.");
                return;
            }

            if (!context.User.IsInRole("Admin"))
            {
                var username = context.User.Identity?.Name ?? "unknown";
                _logger.LogWarning(
                    "Từ chối truy cập AdminOnly: Tài khoản '{Username}' cố truy cập [{Method}] {Path}",
                    username,
                    context.Request.Method,
                    context.Request.Path);

                await WriteErrorAsync(
                    context,
                    HttpStatusCode.Forbidden,
                    "Chỉ tài khoản Quản trị viên (Admin) mới có quyền thực hiện thao tác này.");
                return;
            }
        }

        await _next(context);
    }

    private static async Task WriteErrorAsync(HttpContext context, HttpStatusCode statusCode, string message)
    {
        if (context.Response.HasStarted) return;

        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var json = JsonSerializer.Serialize(new
        {
            success = false,
            statusCode = (int)statusCode,
            message
        });

        await context.Response.WriteAsync(json);
    }
}
