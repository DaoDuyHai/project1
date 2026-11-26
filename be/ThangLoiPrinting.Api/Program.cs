using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Api.Middlewares;
using ThangLoiPrinting.Infrastructure;
using ThangLoiPrinting.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Tách cấu hình Infrastructure (DbContext, SQL Server) chuẩn kiến trúc
builder.Services.AddInfrastructureServices(builder.Configuration);

// 2. Thêm Controllers
builder.Services.AddControllers();

// 3. Cấu hình CORS để Frontend (React/Vite) kết nối không bị chặn
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Tự động tạo Database và áp dụng toàn bộ EF Core Migrations khi khởi động (bỏ qua khi chạy Integration Test)
if (!app.Environment.IsEnvironment("Testing"))
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<AppDbContext>();
        await dbContext.Database.MigrateAsync();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Lỗi khi chạy Migration tự động lúc khởi động ứng dụng.");
    }
}

// 4. Đăng ký Middleware xử lý lỗi tập trung ở đầu Pipeline (bọc toàn bộ ứng dụng)
app.UseMiddleware<ExceptionMiddleware>();

// Phục vụ file tĩnh trong thư mục wwwroot (ảnh, file upload...)
app.UseStaticFiles();

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<AdminAuthorizationMiddleware>();
app.MapControllers();

// Endpoint 1: Hello Server
app.MapGet("/", () => Results.Ok(new
{
    message = "Xin chào! Server Backend In Ấn Thắng Lợi đang hoạt động!",
    timestamp = DateTime.UtcNow,
    status = "Healthy"
}));

// Endpoint 2: Kiểm tra kết nối trực tiếp tới SQL Server trên Docker
app.MapGet("/api/health/db", async (AppDbContext dbContext) =>
{
    bool canConnect = await dbContext.Database.CanConnectAsync();

    return Results.Ok(new
    {
        success = canConnect,
        database = "SQL Server on Docker (localhost,1433)",
        databaseName = "ThangLoiPrintingDb",
        message = canConnect ? "Kết nối SQL Server Docker thành công 100%!" : "Không thể kết nối tới database"
    });
});

// Endpoint 3: Endpoint thử nghiệm cơ chế bắt lỗi tập trung (Test ExceptionMiddleware)
app.MapGet("/api/test-error", () =>
{
    throw new InvalidOperationException("Đây là lỗi thử nghiệm! ExceptionMiddleware đã tóm gọn thành công.");
});

app.Run();

public partial class Program { }
