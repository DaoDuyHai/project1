using ThangLoiPrinting.Application.DTOs;
using ThangLoiPrinting.Application.DTOs.Quotes;
using ThangLoiPrinting.Application.Interfaces;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Domain.Interfaces;

namespace ThangLoiPrinting.Application.Services;

public class QuoteService : IQuoteService
{
    private static readonly HashSet<string> AllowedStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        "Pending",
        "Contacted",
        "Done"
    };

    private readonly IQuoteRepository _quoteRepository;

    public QuoteService(IQuoteRepository quoteRepository)
    {
        _quoteRepository = quoteRepository;
    }

    public async Task<List<QuoteListItemDto>> GetQuotesAsync(string? status = null, CancellationToken ct = default)
    {
        var quotes = await _quoteRepository.GetAllWithProductAsync(status, ct);

        return quotes.Select(q => new QuoteListItemDto
        {
            Id = q.Id,
            FullName = q.FullName,
            PhoneNumber = q.PhoneNumber,
            Email = q.Email,
            ProductId = q.ProductId,
            ProductTitle = q.Product?.Title,
            Quantity = q.Quantity,
            Notes = q.Notes,
            Status = q.Status,
            HandledByUserId = q.HandledByUserId,
            HandledByName = q.HandledByUser != null ? $"{q.HandledByUser.FullName} ({q.HandledByUser.Username})" : null,
            CreatedAt = q.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
            UpdatedAt = q.UpdatedAt?.ToString("yyyy-MM-dd HH:mm")
        }).ToList();
    }

    public async Task<Quote> CreateQuoteAsync(CreateQuoteDto dto, CancellationToken ct = default)
    {
        var quote = new Quote
        {
            FullName = dto.FullName.Trim(),
            PhoneNumber = dto.PhoneNumber.Trim(),
            Email = dto.Email?.Trim(),
            ProductId = dto.ProductId,
            Quantity = dto.Quantity > 0 ? dto.Quantity : 100,
            Notes = dto.Notes?.Trim(),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        await _quoteRepository.AddAsync(quote, ct);
        await _quoteRepository.SaveChangesAsync(ct);

        return quote;
    }

    public async Task<bool> UpdateStatusAsync(int id, string status, int? handledByUserId = null, CancellationToken ct = default)
    {
        var normalized = AllowedStatuses.FirstOrDefault(s => s.Equals(status.Trim(), StringComparison.OrdinalIgnoreCase));
        if (normalized == null)
        {
            throw new ArgumentException("Trạng thái không hợp lệ. Chỉ chấp nhận: Pending, Contacted, Done.");
        }

        var quote = await _quoteRepository.GetByIdAsync(id, ct);
        if (quote == null)
            return false;

        quote.Status = normalized;
        if (handledByUserId.HasValue)
        {
            quote.HandledByUserId = handledByUserId.Value;
        }
        quote.UpdatedAt = DateTime.UtcNow;

        await _quoteRepository.SaveChangesAsync(ct);
        return true;
    }
}
