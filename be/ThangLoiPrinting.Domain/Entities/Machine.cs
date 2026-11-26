namespace ThangLoiPrinting.Domain.Entities;

public class Machine
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;          // Tên máy in / thiết bị (VD: Heidelberg Speedmaster XL 106)
    public string? ModelCode { get; set; }                    // Mã model máy
    public string? Brand { get; set; }                        // Hãng sản xuất (Heidelberg, Konica Minolta, Mimaki...)
    public string? Origin { get; set; }                       // Xuất xứ (Đức, Nhật Bản...)
    public string CategoryTag { get; set; } = "In Offset";    // Nhóm công nghệ (In Offset, In Kỹ thuật số, Gia công sau in)
    public string? ImageUrl { get; set; }                     // Đường dẫn ảnh (/uploads/machines/...)
    public string? Description { get; set; }                  // Mô tả năng lực vận hành
    public string? Specifications { get; set; }               // JSON thông số kỹ thuật [{label, value}]
    public int DisplayOrder { get; set; } = 0;                // Thứ tự hiển thị
    public bool IsActive { get; set; } = true;                // Trạng thái hoạt động
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
