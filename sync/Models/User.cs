using GenshinSchedule.SyncServer.Database;
using Newtonsoft.Json;

namespace GenshinSchedule.SyncServer.Models
{
    public class User
    {
        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("createdTime")]
        public long CreatedTime { get; set; }

        [JsonProperty("is_admin")]
        public bool IsAdmin { get; set; }

        public static User FromDbModel(DbUser user) => new User
        {
            Username    = user.Username,
            CreatedTime = user.CreatedTime.ToUnixTimeMilliseconds(),
            IsAdmin     = user.IsAdmin
        };
    }
}