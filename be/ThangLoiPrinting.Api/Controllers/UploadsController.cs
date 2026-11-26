using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThangLoiPrinting.Api.Attributes;

namespace ThangLoiPrinting.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[AdminOnly]
public class UploadsController : ControllerBase
{
    private static readonly HashSet<string> AllowedFolders = new(StringComparer.OrdinalIgnoreCase)
    {
        "products",
        "news",
        "clients",
        "testimonials"
    };

    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif"
    };

    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    private readonly IWebHostEnvironment _env;

    public UploadsController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpPost("image")]
    [RequestSizeLimit(MaxFileSizeBytes)]
    public async Task<IActionResult> UploadImage(
        IFormFile? file,
        [FromQuery] string folder = "products",
        CancellationToken ct = default)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "Vui lòng chọn tệp hình ảnh để tải lên." });
        }

        if (file.Length > MaxFileSizeBytes)
        {
            return BadRequest(new { message = "Kích thước ảnh vượt quá giới hạn tối đa 5 MB." });
        }

        var normalizedFolder = folder?.Trim().ToLowerInvariant() ?? "products";
        if (!AllowedFolders.Contains(normalizedFolder))
        {
            return BadRequest(new { message = "Thư mục lưu trữ không hợp lệ." });
        }

        var extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
        if (string.IsNullOrEmpty(extension) || !AllowedExtensions.Contains(extension))
        {
            return BadRequest(new { message = "Chỉ hỗ trợ định dạng ảnh .jpg, .jpeg, .png, .webp, .gif." });
        }

        if (!string.IsNullOrEmpty(file.ContentType) && !file.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new { message = "Tệp tải lên không phải là hình ảnh hợp lệ." });
        }

        var webRoot = string.IsNullOrWhiteSpace(_env.WebRootPath)
            ? Path.Combine(_env.ContentRootPath, "wwwroot")
            : _env.WebRootPath;

        var targetDirectory = Path.Combine(webRoot, "uploads", normalizedFolder);
        Directory.CreateDirectory(targetDirectory);

        var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmss}_{Guid.NewGuid().ToString("N")[..12]}{extension}";
        var fullPath = Path.Combine(targetDirectory, fileName);

        await using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream, ct);
        }

        var relativeUrl = $"/uploads/{normalizedFolder}/{fileName}";
        return Ok(new
        {
            url = relativeUrl,
            fileName,
            folder = normalizedFolder,
            size = file.Length
        });
    }
}
