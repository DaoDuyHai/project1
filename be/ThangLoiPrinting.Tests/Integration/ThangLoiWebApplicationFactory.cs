using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ThangLoiPrinting.Application.Interfaces;
using ThangLoiPrinting.Domain.Entities;
using ThangLoiPrinting.Infrastructure.Data;

namespace ThangLoiPrinting.Tests.Integration;

public class ThangLoiWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly string _dbName = $"ThangLoiTestDb_{Guid.NewGuid():N}";

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureAppConfiguration((_, config) =>
        {
            config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["JwtSettings:SecretKey"] = "ThangLoiPrinting@2026#SuperSecretKey_JwtToken_VicoGroup!",
                ["JwtSettings:Issuer"] = "ThangLoiPrinting.Api",
                ["JwtSettings:Audience"] = "ThangLoiPrinting.Client",
                ["JwtSettings:ExpirationMinutes"] = "60",
                ["ConnectionStrings:DefaultConnection"] = "Server=localhost,1433;Database=TestIgnored;"
            });
        });

        builder.ConfigureServices(services =>
        {
            services.RemoveAll<IDbContextOptionsConfiguration<AppDbContext>>();
            services.RemoveAll<DbContextOptions<AppDbContext>>();
            services.RemoveAll<AppDbContext>();

            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase(_dbName));

            using var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();

            if (!db.Categories.Any())
            {
                db.Categories.Add(new Category { Id = 1, Name = "In Card Visit", Slug = "in-card-visit" });
                db.CompanyInfo.Add(new CompanyInfo
                {
                    Id = 1,
                    CompanyName = "In Ấn Thắng Lợi",
                    ShortName = "THẮNG LỢI",
                    Slogan = "Professional Printing Solutions",
                    Hotline = "0918585505",
                    Email = "contact@inanthangloi.vn",
                    Address = "Hà Nội",
                    Copyright = "© 2026 In Ấn Thắng Lợi"
                });
                db.SaveChanges();
            }
        });
    }

    public string CreateToken(int userId, string username, string role)
    {
        using var scope = Services.CreateScope();
        var jwtGenerator = scope.ServiceProvider.GetRequiredService<IJwtTokenGenerator>();
        var (token, _) = jwtGenerator.GenerateToken(new User
        {
            Id = userId,
            Username = username,
            FullName = $"{username} FullName",
            Role = role,
            IsActive = true
        });
        return token;
    }
}
