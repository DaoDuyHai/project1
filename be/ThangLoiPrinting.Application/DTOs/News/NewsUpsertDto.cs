using System.ComponentModel.DataAnnotations;

namespace ThangLoiPrinting.Application.DTOs.News;

public class NewsUpsertDto
{
    [Required(ErrorMessage = "Tiêu đề bài viết không được để trống")]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Slug { get; set; }

    [Required(ErrorMessage = "Tóm tắt bài viết không được để trống")]
    [MaxLength(1000)]
    public string Summary { get; set; } = string.Empty;

    public string? Content { get; set; }

    [MaxLength(500)]
    public string? Image { get; set; }

    public bool IsFeatured { get; set; } = false;
}
