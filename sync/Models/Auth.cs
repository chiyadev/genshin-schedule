using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace GenshinSchedule.SyncServer.Models
{
    public class AuthRequest
    {
        [JsonProperty("username"), Required, MinLength(3), MaxLength(64), RegularExpression("^(?=.{3,64}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]
        public string Username { get; set; }

        [JsonProperty("password"), Required, MaxLength(256)]
        public string Password { get; set; }
    }

    public class AuthResponse
    {
        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }
    }
}