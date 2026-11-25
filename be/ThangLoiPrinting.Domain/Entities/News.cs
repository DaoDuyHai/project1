namespace ThangLoiPrinting.Domain.Entities;

public class News
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;     // Tiêu đề bài viết
    public string Slug { get; set; } = string.Empty;      // Đường dẫn URL chuẩn SEO
    public string Summary { get; set; } = string.Empty;   // Đoạn tóm tắt (excerpt)
    public string? Content { get; set; }                  // Nội dung chi tiết bài viết
    public string Image { get; set; } = string.Empty;     // Đường dẫn ảnh đại diện (/uploads/news/...)
    public bool IsFeatured { get; set; } = false;         // true: Bài viết lớn tiêu điểm
    public int Views { get; set; } = 0;                   // Lượt xem bài viết
    public DateTime PublishedAt { get; set; } = DateTime.UtcNow; // Ngày đăng bài
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
