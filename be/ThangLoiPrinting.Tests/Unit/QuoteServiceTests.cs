using Moq;
using ThangLoiPrinting.Application.DTOs;
using ThangLoiPrinting.Application.Services;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Domain.Interfaces;
using Xunit;

namespace ThangLoiPrinting.Tests.Unit;

public class QuoteServiceTests
{
    private readonly Mock<IQuoteRepository> _quoteRepoMock;
    private readonly QuoteService _sut;

    public QuoteServiceTests()
    {
        _quoteRepoMock = new Mock<IQuoteRepository>();
        _sut = new QuoteService(_quoteRepoMock.Object);
    }

    [Fact]
    public async Task CreateQuoteAsync_ShouldTrimInputsAndDefaultQuantityTo100_WhenQuantityIsZero()
    {
        var dto = new CreateQuoteDto
        {
            FullName = "  Nguyễn Văn A  ",
            PhoneNumber = "  0912345678  ",
            Email = "  a@example.com  ",
            ProductId = 5,
            Quantity = 0,
            Notes = "  In nhanh  "
        };

        var result = await _sut.CreateQuoteAsync(dto);

        Assert.Equal("Nguyễn Văn A", result.FullName);
        Assert.Equal("0912345678", result.PhoneNumber);
        Assert.Equal("a@example.com", result.Email);
        Assert.Equal(100, result.Quantity);
        Assert.Equal("Pending", result.Status);
        Assert.Equal("In nhanh", result.Notes);
        _quoteRepoMock.Verify(r => r.AddAsync(It.IsAny<Quote>(), It.IsAny<CancellationToken>()), Times.Once);
        _quoteRepoMock.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateStatusAsync_ShouldUpdateStatusHandledByAndUpdatedAt_WhenQuoteExists()
    {
        var existing = new Quote
        {
            Id = 10,
            FullName = "Khách Test",
            PhoneNumber = "0900000000",
            Status = "Pending"
        };

        _quoteRepoMock.Setup(r => r.GetByIdAsync(10, It.IsAny<CancellationToken>()))
                      .ReturnsAsync(existing);

        var updated = await _sut.UpdateStatusAsync(10, "done", handledByUserId: 2);

        Assert.True(updated);
        Assert.Equal("Done", existing.Status);
        Assert.Equal(2, existing.HandledByUserId);
        Assert.NotNull(existing.UpdatedAt);
        _quoteRepoMock.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateStatusAsync_ShouldThrowArgumentException_WhenStatusIsInvalid()
    {
        await Assert.ThrowsAsync<ArgumentException>(() =>
            _sut.UpdateStatusAsync(10, "Cancelled", handledByUserId: 1));

        _quoteRepoMock.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task UpdateStatusAsync_ShouldReturnFalse_WhenQuoteDoesNotExist()
    {
        _quoteRepoMock.Setup(r => r.GetByIdAsync(999, It.IsAny<CancellationToken>()))
                      .ReturnsAsync((Quote?)null);

        var updated = await _sut.UpdateStatusAsync(999, "Contacted", handledByUserId: 1);

        Assert.False(updated);
        _quoteRepoMock.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task GetQuotesAsync_ShouldFormatHandledByName_WhenHandledByUserIsLoaded()
    {
        var quotes = new List<Quote>
        {
            new()
            {
                Id = 1,
                FullName = "Công ty ABC",
                PhoneNumber = "0988888888",
                Quantity = 500,
                Status = "Contacted",
                HandledByUserId = 2,
                HandledByUser = new User { Id = 2, Username = "hai", FullName = "Nguyễn Văn Hải", Role = "Staff" },
                Product = new Product { Id = 3, Title = "Card Visit" },
                CreatedAt = new DateTime(2026, 11, 26, 8, 30, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2026, 11, 26, 9, 0, 0, DateTimeKind.Utc)
            }
        };

        _quoteRepoMock.Setup(r => r.GetAllWithProductAsync(null, It.IsAny<CancellationToken>()))
                      .ReturnsAsync(quotes);

        var result = await _sut.GetQuotesAsync();

        var item = Assert.Single(result);
        Assert.Equal("Nguyễn Văn Hải (hai)", item.HandledByName);
        Assert.Equal("Card Visit", item.ProductTitle);
        Assert.Equal("2026-11-26 09:00", item.UpdatedAt);
    }
}
