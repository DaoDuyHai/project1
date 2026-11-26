using ThangLoiPrinting.Domain.Entities;

namespace ThangLoiPrinting.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username, CancellationToken ct = default);
    Task<User?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<bool> AnyUsersAsync(CancellationToken ct = default);
    Task AddAsync(User user, CancellationToken ct = default);
}
