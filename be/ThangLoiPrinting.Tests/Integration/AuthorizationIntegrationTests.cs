using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Xunit;

namespace ThangLoiPrinting.Tests.Integration;

public class AuthorizationIntegrationTests : IClassFixture<ThangLoiWebApplicationFactory>
{
    private readonly ThangLoiWebApplicationFactory _factory;

    public AuthorizationIntegrationTests(ThangLoiWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetQuotes_WithoutToken_Returns401Unauthorized()
    {
        var client = _factory.CreateClient();

        var response = await client.GetAsync("/api/quotes");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetQuotes_WithStaffToken_Returns200Ok()
    {
        var client = _factory.CreateClient();
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _factory.CreateToken(2, "hai", "Staff"));

        var response = await client.GetAsync("/api/quotes");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task CreateProduct_WithoutToken_Returns401Unauthorized()
    {
        var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/products", new
        {
            title = "Test Card",
            price = 100000,
            categoryId = 1,
            image = "/uploads/products/test.png"
        });

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task CreateProduct_WithStaffToken_Returns403Forbidden()
    {
        var client = _factory.CreateClient();
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _factory.CreateToken(2, "hai", "Staff"));

        var response = await client.PostAsJsonAsync("/api/products", new
        {
            title = "Test Card",
            price = 100000,
            categoryId = 1,
            image = "/uploads/products/test.png"
        });

        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [Fact]
    public async Task CreateProduct_WithAdminToken_Returns201Created()
    {
        var client = _factory.CreateClient();
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _factory.CreateToken(1, "admin", "Admin"));

        var response = await client.PostAsJsonAsync("/api/products", new
        {
            title = "Namecard Cao Cấp",
            sku = "NC-99",
            price = 150000,
            priceUnit = "/hộp",
            categoryId = 1,
            image = "/uploads/products/test.png",
            description = "Giấy C300"
        });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Fact]
    public async Task UpdateCompanyInfo_WithStaffToken_Returns403Forbidden()
    {
        var client = _factory.CreateClient();
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _factory.CreateToken(3, "ha", "Staff"));

        var response = await client.PutAsJsonAsync("/api/company-info", new
        {
            companyName = "Updated",
            shortName = "THẮNG LỢI",
            slogan = "Professional Printing Solutions",
            hotline = "0918585505",
            email = "test@inanthangloi.vn",
            address = "Hà Nội",
            copyright = "© 2026"
        });

        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [Fact]
    public async Task CreateQuote_WithoutToken_Returns201CreatedForPublicCustomer()
    {
        var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/quotes", new
        {
            fullName = "Khách Vãng Lai",
            phoneNumber = "0912345678",
            email = "khach@example.com",
            quantity = 200,
            notes = "Báo giá nhanh"
        });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }
}
