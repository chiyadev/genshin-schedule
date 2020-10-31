using System;
using System.Text.Json.Serialization;
using GenshinSchedule.SyncServer.Database;

namespace GenshinSchedule.SyncServer.Models
{
    public class User
    {
        [JsonPropertyName("username")]
        public string Username { get; set; }

        [JsonPropertyName("createdTime")]
        public DateTime CreatedTime { get; set; }

        public static User FromDbModel(DbUser user) => new User
        {
            Username    = user.Username,
            CreatedTime = user.CreatedTime
        };
    }
}