using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GenshinSchedule.SyncServer.Models
{
    public class AuthRequest
    {
        [JsonPropertyName("username"), Required, MinLength(3), MaxLength(20), RegularExpression("^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]
        public string Username { get; set; }

        [JsonPropertyName("password"), Required, MaxLength(100)]
        public string Password { get; set; }
    }

    public class AuthResponse
    {
        [JsonPropertyName("token")]
        public string Token { get; set; }

        [JsonPropertyName("user")]
        public User User { get; set; }
    }
}