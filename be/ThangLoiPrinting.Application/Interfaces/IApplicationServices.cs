using ThangLoiPrinting.Application.DTOs;
using ThangLoiPrinting.Application.DTOs.Auth;
using ThangLoiPrinting.Application.DTOs.Quotes;
using ThangLoiPrinting.Domain.Entities;

namespace ThangLoiPrinting.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken ct = default);
    Task<UserProfileDto?> GetProfileAsync(int userId, CancellationToken ct = default);
}

public interface IQuoteService
{
    Task<List<QuoteListItemDto>> GetQuotesAsync(string? status = null, CancellationToken ct = default);
    Task<Quote> CreateQuoteAsync(CreateQuoteDto dto, CancellationToken ct = default);
    Task<bool> UpdateStatusAsync(int id, string status, int? handledByUserId = null, CancellationToken ct = default);
}
