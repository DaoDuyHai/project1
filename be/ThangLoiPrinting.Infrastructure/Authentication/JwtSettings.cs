namespace ThangLoiPrinting.Infrastructure.Authentication;

public class JwtSettings
{
    public const string SectionName = "JwtSettings";

    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = "ThangLoiPrinting.Api";
    public string Audience { get; set; } = "ThangLoiPrinting.Client";
    public int ExpirationMinutes { get; set; } = 480; // 8 giờ làm việc
}
