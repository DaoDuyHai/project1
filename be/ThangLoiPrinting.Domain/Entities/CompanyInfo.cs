namespace ThangLoiPrinting.Domain.Entities;

public class CompanyInfo
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;   // Tên đầy đủ công ty
    public string ShortName { get; set; } = "THẮNG LỢI";      // Tên viết tắt hiển thị nổi bật
    public string Slogan { get; set; } = "Professional Printing Solutions";
    public string Address { get; set; } = string.Empty;       // Địa chỉ xưởng / văn phòng
    public string Hotline { get; set; } = string.Empty;       // Số hotline chính
    public string Email { get; set; } = string.Empty;         // Email liên hệ
    public string? FacebookUrl { get; set; }                  // Link Fanpage Facebook
    public string? YoutubeUrl { get; set; }                   // Link kênh YouTube
    public string Copyright { get; set; } = string.Empty;     // Dòng bản quyền chân trang
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
