namespace ThangLoiPrinting.Domain.Entities;

public class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty; // Tên sản phẩm in ấn
    public string Slug { get; set; } = string.Empty;  // Đường dẫn tĩnh URL
    public string Image { get; set; } = string.Empty; // Đường dẫn ảnh (VD: /uploads/products/p1.png)
    public decimal Price { get; set; }                // Giá tiền
    public string PriceUnit { get; set; } = "/hộp";   // Đơn vị tính: "/hộp", "/cuốn", "/m²", "/cái"...
    public string? Sku { get; set; }                  // Mã SKU sản phẩm
    public string? Description { get; set; }          // Mô tả sản phẩm

    // Lưu mảng JSON thông số kỹ thuật (Kích thước, Loại giấy, Công nghệ in, Gia công...)
    public string? Specifications { get; set; }

    // Khóa ngoại liên kết tới bảng Categories
    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
