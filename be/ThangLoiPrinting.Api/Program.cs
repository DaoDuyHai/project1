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

// Phục vụ file tĩnh trong thư mục wwwroot (ảnh, file upload...)
app.UseStaticFiles();

app.UseCors("AllowFrontend");
app.UseAuthorization();
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
    try
    {
        // Tự động đảm bảo Database và các Bảng đã tồn tại nếu chưa có
        await dbContext.Database.EnsureCreatedAsync();
        bool canConnect = await dbContext.Database.CanConnectAsync();

        return Results.Ok(new
        {
            success = canConnect,
            database = "SQL Server on Docker (localhost,1433)",
            databaseName = "ThangLoiPrintingDb",
            message = canConnect ? "Kết nối SQL Server Docker thành công 100%!" : "Không thể kết nối tới database"
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            detail: ex.Message,
            title: "Lỗi kết nối SQL Server Docker"
        );
    }
});

app.Run();
