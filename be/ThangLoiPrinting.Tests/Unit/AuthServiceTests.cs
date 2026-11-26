using Moq;
using ThangLoiPrinting.Application.DTOs.Auth;
using ThangLoiPrinting.Application.Interfaces;
using ThangLoiPrinting.Application.Services;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Domain.Interfaces;
using Xunit;

namespace ThangLoiPrinting.Tests.Unit;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepoMock;
    private readonly Mock<IPasswordHasherService> _hasherMock;
    private readonly Mock<IJwtTokenGenerator> _jwtMock;
    private readonly AuthService _sut;

    public AuthServiceTests()
    {
        _userRepoMock = new Mock<IUserRepository>();
        _hasherMock = new Mock<IPasswordHasherService>();
        _jwtMock = new Mock<IJwtTokenGenerator>();
        _sut = new AuthService(_userRepoMock.Object, _hasherMock.Object, _jwtMock.Object);
    }

    [Fact]
    public async Task LoginAsync_ShouldReturnTokenAndProfile_WhenCredentialsAreValid()
    {
        var user = new User
        {
            Id = 1,
            Username = "admin",
            FullName = "Quản trị viên",
            Role = "Admin",
            IsActive = true
        };
        var expiresAt = DateTime.UtcNow.AddHours(8);

        _userRepoMock.Setup(r => r.GetByUsernameAsync("admin", It.IsAny<CancellationToken>()))
                     .ReturnsAsync(user);
        _hasherMock.Setup(h => h.VerifyPassword(user, "Admin@2026")).Returns(true);
        _jwtMock.Setup(j => j.GenerateToken(user)).Returns(("mock-jwt-token", expiresAt));

        var result = await _sut.LoginAsync(new LoginRequestDto { Username = " admin ", Password = "Admin@2026" });

        Assert.NotNull(result);
        Assert.Equal("mock-jwt-token", result.AccessToken);
        Assert.Equal("Admin", result.User.Role);
        Assert.Equal("admin", result.User.Username);
    }

    [Fact]
    public async Task LoginAsync_ShouldReturnNull_WhenUserDoesNotExist()
    {
        _userRepoMock.Setup(r => r.GetByUsernameAsync("unknown", It.IsAny<CancellationToken>()))
                     .ReturnsAsync((User?)null);

        var result = await _sut.LoginAsync(new LoginRequestDto { Username = "unknown", Password = "123" });

        Assert.Null(result);
    }

    [Fact]
    public async Task LoginAsync_ShouldReturnNull_WhenUserIsInactive()
    {
        var user = new User { Id = 2, Username = "hai", Role = "Staff", IsActive = false };
        _userRepoMock.Setup(r => r.GetByUsernameAsync("hai", It.IsAny<CancellationToken>()))
                     .ReturnsAsync(user);

        var result = await _sut.LoginAsync(new LoginRequestDto { Username = "hai", Password = "Staff@2026" });

        Assert.Null(result);
        _hasherMock.Verify(h => h.VerifyPassword(It.IsAny<User>(), It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public async Task LoginAsync_ShouldReturnNull_WhenPasswordIsWrong()
    {
        var user = new User { Id = 2, Username = "hai", Role = "Staff", IsActive = true };
        _userRepoMock.Setup(r => r.GetByUsernameAsync("hai", It.IsAny<CancellationToken>()))
                     .ReturnsAsync(user);
        _hasherMock.Setup(h => h.VerifyPassword(user, "wrong")).Returns(false);

        var result = await _sut.LoginAsync(new LoginRequestDto { Username = "hai", Password = "wrong" });

        Assert.Null(result);
        _jwtMock.Verify(j => j.GenerateToken(It.IsAny<User>()), Times.Never);
    }

    [Fact]
    public async Task GetProfileAsync_ShouldReturnNull_WhenUserIsInactive()
    {
        _userRepoMock.Setup(r => r.GetByIdAsync(3, It.IsAny<CancellationToken>()))
                     .ReturnsAsync(new User { Id = 3, Username = "binh", IsActive = false });

        var profile = await _sut.GetProfileAsync(3);

        Assert.Null(profile);
    }
}
