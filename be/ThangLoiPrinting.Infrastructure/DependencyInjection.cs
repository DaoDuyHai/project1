using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ThangLoiPrinting.Application.Interfaces;
using ThangLoiPrinting.Application.Services;
using ThangLoiPrinting.Domain.Interfaces;
using ThangLoiPrinting.Infrastructure.Authentication;
using ThangLoiPrinting.Infrastructure.Data;
using ThangLoiPrinting.Infrastructure.Repositories;

namespace ThangLoiPrinting.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString, b =>
                b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));

        // Repositories (Domain Interfaces -> Infrastructure Implementations)
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IQuoteRepository, QuoteRepository>();

        // Application Services
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IQuoteService, QuoteService>();

        // Security Helpers
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IPasswordHasherService, PasswordHasherService>();

        // Options Pattern cho JWT Settings
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        var jwtSettings = configuration.GetSection(JwtSettings.SectionName).Get<JwtSettings>() ?? new JwtSettings();

        if (string.IsNullOrWhiteSpace(jwtSettings.SecretKey) || jwtSettings.SecretKey.Length < 32)
        {
            throw new InvalidOperationException("JwtSettings:SecretKey chưa được cấu hình hoặc ngắn hơn 32 ký tự.");
        }

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),
                ClockSkew = TimeSpan.Zero
            };

            // Chuẩn hóa response JSON khi chưa đăng nhập (401) hoặc không đủ quyền (403)
            options.Events = new JwtBearerEvents
            {
                OnChallenge = async context =>
                {
                    context.HandleResponse();
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";
                    var payload = JsonSerializer.Serialize(new
                    {
                        success = false,
                        statusCode = 401,
                        message = "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn."
                    });
                    await context.Response.WriteAsync(payload);
                },
                OnForbidden = async context =>
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    context.Response.ContentType = "application/json";
                    var payload = JsonSerializer.Serialize(new
                    {
                        success = false,
                        statusCode = 403,
                        message = "Bạn không có quyền thực hiện thao tác này."
                    });
                    await context.Response.WriteAsync(payload);
                }
            };
        });

        services.AddAuthorization();

        return services;
    }
}
