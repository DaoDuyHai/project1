using System.ComponentModel.DataAnnotations;

namespace ThangLoiPrinting.Application.DTOs.Products;

public class ProductUpsertDto
{
    [Required(ErrorMessage = "Tên sản phẩm không được để trống")]
    [MaxLength(250)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(250)]
    public string? Slug { get; set; }

    [MaxLength(500)]
    public string? Image { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Giá sản phẩm không hợp lệ")]
    public decimal Price { get; set; }

    [MaxLength(50)]
    public string PriceUnit { get; set; } = "/hộp";

    [MaxLength(50)]
    public string? Sku { get; set; }

    public string? Description { get; set; }

    [Required(ErrorMessage = "Vui lòng chọn danh mục")]
    public int CategoryId { get; set; }
}
