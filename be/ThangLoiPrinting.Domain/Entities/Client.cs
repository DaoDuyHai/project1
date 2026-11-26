namespace ThangLoiPrinting.Domain.Entities;

public class Client
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;       // Tên đối tác (VD: AVAC, Saint Laurent, Dior...)
    public string LogoUrl { get; set; } = string.Empty;    // Đường dẫn logo (/uploads/clients/...)
    public string? WebsiteUrl { get; set; }                // Đường dẫn website đối tác (tùy chọn)
    public int DisplayOrder { get; set; } = 0;             // Thứ tự hiển thị
    public bool IsActive { get; set; } = true;             // Trạng thái hiển thị
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
