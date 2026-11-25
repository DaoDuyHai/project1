using System.Net;
using System.Text.Json;

namespace ThangLoiPrinting.Api.Middlewares;

/// <summary>
/// Middleware xử lý lỗi tập trung toàn hệ thống (Global Exception Handling Middleware).
/// Tương tự như error-handling middleware trong Express: (err, req, res, next) => { ... }
/// </summary>
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // Cho request đi tiếp vào pipeline (các middleware sau và controllers)
            await _next(context);
        }
        catch (Exception ex)
        {
            // Ghi log lỗi chi tiết ra console/terminal
            _logger.LogError(ex, "Đã xảy ra lỗi chưa xử lý trong request [{Method}] {Path}: {Message}",
                context.Request.Method,
                context.Request.Path,
                ex.Message);

            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        // Nếu response đã bắt đầu gửi header về client thì không thể ghi đè nữa
        if (context.Response.HasStarted)
        {
            _logger.LogWarning("Response đã bắt đầu gửi, không thể ghi đè ExceptionMiddleware.");
            return;
        }

        context.Response.ContentType = "application/json";

        // Phân loại status code dựa theo loại Exception
        var (statusCode, message) = exception switch
        {
            KeyNotFoundException => (HttpStatusCode.NotFound, "Không tìm thấy tài nguyên yêu cầu."),
            ArgumentException or BadHttpRequestException => (HttpStatusCode.BadRequest, exception.Message),
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "Bạn không có quyền truy cập tài nguyên này."),
            _ => (HttpStatusCode.InternalServerError, "Đã xảy ra lỗi từ phía hệ thống. Vui lòng thử lại sau!")
        };

        context.Response.StatusCode = (int)statusCode;

        // Chuẩn hóa format response đồng bộ với toàn bộ API của dự án
        var response = new
        {
            success = false,
            statusCode = (int)statusCode,
            message,
            // Chỉ hiển thị chi tiết lỗi kỹ thuật ở môi trường Development
            detail = _env.IsDevelopment() ? exception.Message : null,
            stackTrace = _env.IsDevelopment() ? exception.StackTrace : null
        };

        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
        };

        var json = JsonSerializer.Serialize(response, jsonOptions);
        await context.Response.WriteAsync(json);
    }
}

