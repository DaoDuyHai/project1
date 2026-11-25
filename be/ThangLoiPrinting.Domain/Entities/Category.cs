namespace ThangLoiPrinting.Domain.Entities;

public class Category
{
    // C# dùng cú pháp { get; set; } để vừa là biến, vừa tự sinh hàm đọc/ghi (Getter/Setter)
    public int Id { get; set; }

    // Tên danh mục (ví dụ: "In Card Visit", "In Catalogue")
    public string Name { get; set; } = string.Empty;

    // Đường dẫn tĩnh URL (ví dụ: "in-card-visit")
    public string Slug { get; set; } = string.Empty;

    // Mô tả ngắn - Dấu '?' nghĩa là cho phép null (giống 'description?: string' trong TypeScript)
    public string? Description { get; set; }

    // Ngày tạo danh mục
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}