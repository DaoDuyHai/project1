using ThangLoiPrinting.Application.DTOs.Auth;
using ThangLoiPrinting.Application.Interfaces;
using ThangLoiPrinting.Domain.Interfaces;

namespace ThangLoiPrinting.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly IJwtTokenGenerator _jwtGenerator;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasherService passwordHasher,
        IJwtTokenGenerator jwtGenerator)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtGenerator = jwtGenerator;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken ct = default)
    {
        var username = request.Username.Trim();
        var user = await _userRepository.GetByUsernameAsync(username, ct);

        if (user == null || !user.IsActive)
            return null;

        if (!_passwordHasher.VerifyPassword(user, request.Password))
            return null;

        var (token, expiresAt) = _jwtGenerator.GenerateToken(user);

        return new LoginResponseDto
        {
            AccessToken = token,
            ExpiresAt = expiresAt,
            User = new UserProfileDto
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Role = user.Role
            }
        };
    }

    public async Task<UserProfileDto?> GetProfileAsync(int userId, CancellationToken ct = default)
    {
        var user = await _userRepository.GetByIdAsync(userId, ct);
        if (user == null || !user.IsActive)
            return null;

        return new UserProfileDto
        {
            Id = user.Id,
            Username = user.Username,
            FullName = user.FullName,
            Role = user.Role
        };
    }
}
