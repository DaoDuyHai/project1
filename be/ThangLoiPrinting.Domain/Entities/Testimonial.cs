namespace ThangLoiPrinting.Domain.Entities;

public class Testimonial
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;       // Tên khách hàng (VD: Chị Nguyễn Thị Mai)
    public string Role { get; set; } = string.Empty;       // Chức danh & Công ty (VD: TGĐ công ty Baobab)
    public string Avatar { get; set; } = string.Empty;     // Đường dẫn ảnh chân dung (/uploads/testimonials/...)
    public string Quote { get; set; } = string.Empty;      // Lời nhận xét, đánh giá thực tế
    public int Rating { get; set; } = 5;                   // Đánh giá sao (1 - 5)
    public int DisplayOrder { get; set; } = 0;             // Thứ tự hiển thị
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
