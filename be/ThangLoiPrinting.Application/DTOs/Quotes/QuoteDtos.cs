using System.ComponentModel.DataAnnotations;

namespace ThangLoiPrinting.Application.DTOs.Quotes;

public class UpdateQuoteStatusDto
{
    [Required(ErrorMessage = "Trạng thái không được để trống")]
    [MaxLength(50)]
    public string Status { get; set; } = string.Empty;
}

public class QuoteListItemDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Email { get; set; }
    public int? ProductId { get; set; }
    public string? ProductTitle { get; set; }
    public int Quantity { get; set; }
    public string? Notes { get; set; }
    public string Status { get; set; } = string.Empty;
    public int? HandledByUserId { get; set; }
    public string? HandledByName { get; set; }
    public string CreatedAt { get; set; } = string.Empty;
    public string? UpdatedAt { get; set; }
}
