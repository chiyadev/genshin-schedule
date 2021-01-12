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

        [JsonProperty("isAdmin")]
        public bool IsAdmin { get; set; }

        [JsonProperty("discordUserId")]
        public ulong? DiscordUserId { get; set; }

        public static User FromDbModel(DbUser user) => new User
        {
            Username      = user.Username,
            CreatedTime   = user.CreatedTime.ToUnixTimeMilliseconds(),
            IsAdmin       = user.IsAdmin,
            DiscordUserId = user.DiscordUserId
        };
    }
}