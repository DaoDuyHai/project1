using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Domain.Interfaces;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Infrastructure.Repositories;

public class QuoteRepository : IQuoteRepository
{
    private readonly AppDbContext _context;

    public QuoteRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<List<Quote>> GetAllWithProductAsync(string? status = null, CancellationToken ct = default)
    {
        var query = _context.Quotes
            .AsNoTracking()
            .Include(q => q.Product)
            .Include(q => q.HandledByUser)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status) && !status.Equals("all", StringComparison.OrdinalIgnoreCase))
        {
            var s = status.Trim();
            query = query.Where(q => q.Status == s);
        }

        return query
            .OrderByDescending(q => q.CreatedAt)
            .ToListAsync(ct);
    }

    public Task<Quote?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return _context.Quotes.FirstOrDefaultAsync(q => q.Id == id, ct);
    }

    public async Task AddAsync(Quote quote, CancellationToken ct = default)
    {
        await _context.Quotes.AddAsync(quote, ct);
    }

    public Task SaveChangesAsync(CancellationToken ct = default)
    {
        return _context.SaveChangesAsync(ct);
    }
}
