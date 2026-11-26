using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Domain.Interfaces;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<User?> GetByUsernameAsync(string username, CancellationToken ct = default)
    {
        return _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == username, ct);
    }

    public Task<User?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, ct);
    }

    public Task<bool> AnyUsersAsync(CancellationToken ct = default)
    {
        return _context.Users.AnyAsync(ct);
    }

    public async Task AddAsync(User user, CancellationToken ct = default)
    {
        await _context.Users.AddAsync(user, ct);
        await _context.SaveChangesAsync(ct);
    }
}
