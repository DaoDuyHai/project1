using System.ComponentModel.DataAnnotations;

namespace ThangLoiPrinting.Application.DTOs;

public class CreateQuoteDto
{
    [Required(ErrorMessage = "Họ và tên không được để trống")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Số điện thoại không được để trống")]
    public string PhoneNumber { get; set; } = string.Empty;

    public string? Email { get; set; }

    public int? ProductId { get; set; }

    public int Quantity { get; set; } = 100;

    public string? Notes { get; set; }
}
