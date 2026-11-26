namespace ThangLoiPrinting.Api.Attributes;

/// <summary>
/// Đánh dấu Endpoint chỉ cho phép tài khoản có vai trò Admin thực thi.
/// Được kiểm tra tập trung bởi AdminAuthorizationMiddleware.
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class AdminOnlyAttribute : Attribute
{
}
