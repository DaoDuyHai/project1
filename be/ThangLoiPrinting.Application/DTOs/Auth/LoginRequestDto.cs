using System.ComponentModel.DataAnnotations;

namespace ThangLoiPrinting.Application.DTOs.Auth;

public class LoginRequestDto
{
    [Required(ErrorMessage = "Vui lòng nhập tên đăng nhập")]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
    [MaxLength(200)]
    public string Password { get; set; } = string.Empty;
}
