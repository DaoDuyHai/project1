namespace ThangLoiPrinting.Domain.Entities;

public class Quote
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;     // Tên khách hàng
    public string PhoneNumber { get; set; } = string.Empty;  // Số điện thoại liên hệ
    public string? Email { get; set; }                       // Email liên hệ
    public int? ProductId { get; set; }                      // Khóa ngoại trỏ đến Sản phẩm cần in
    public Product? Product { get; set; }
    public int Quantity { get; set; } = 100;                 // Số lượng cần in
    public string? Notes { get; set; }                       // Ghi chú quy cách in ấn
    public string Status { get; set; } = "Pending";          // Trạng thái: Pending, Contacted, Done
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
