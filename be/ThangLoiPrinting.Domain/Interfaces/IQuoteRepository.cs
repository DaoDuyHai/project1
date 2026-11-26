using ThangLoiPrinting.Domain.Entities;

namespace ThangLoiPrinting.Domain.Interfaces;

public interface IQuoteRepository
{
    Task<List<Quote>> GetAllWithProductAsync(string? status = null, CancellationToken ct = default);
    Task<Quote?> GetByIdAsync(int id, CancellationToken ct = default);
    Task AddAsync(Quote quote, CancellationToken ct = default);
    Task SaveChangesAsync(CancellationToken ct = default);
}
