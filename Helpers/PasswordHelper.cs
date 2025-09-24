using System.Security.Cryptography;
using System.Text;

namespace WebAPI_NRW.Helpers
{
    public static class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public static bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            // Hash lại mật khẩu người dùng nhập vào
            var hashOfInput = HashPassword(inputPassword);

            // So sánh với hash lưu trong DB
            return hashOfInput == hashedPassword;
        }
    }
}
