using System.ComponentModel.DataAnnotations;

namespace ThangLoiPrinting.Application.DTOs.Company;

public class CompanyInfoUpdateDto
{
    [Required(ErrorMessage = "Tên công ty không được để trống")]
    [MaxLength(300)]
    public string CompanyName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Tên viết tắt không được để trống")]
    [MaxLength(100)]
    public string ShortName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Slogan không được để trống")]
    [MaxLength(250)]
    public string Slogan { get; set; } = string.Empty;

    [Required(ErrorMessage = "Địa chỉ không được để trống")]
    [MaxLength(500)]
    public string Address { get; set; } = string.Empty;

    [Required(ErrorMessage = "Hotline không được để trống")]
    [MaxLength(50)]
    public string Hotline { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email không được để trống")]
    [EmailAddress(ErrorMessage = "Email không hợp lệ")]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? FacebookUrl { get; set; }

    [MaxLength(500)]
    public string? YoutubeUrl { get; set; }

    [Required(ErrorMessage = "Bản quyền không được để trống")]
    [MaxLength(300)]
    public string Copyright { get; set; } = string.Empty;
}
