using GenshinSchedule.SyncServer.Database;
using Newtonsoft.Json;

namespace GenshinSchedule.SyncServer.Models
{
    public class Notification
    {
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("time")]
        public long Time { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("color")]
        public string Color { get; set; }

        public static Notification FromDbModel(DbNotification notification) => new Notification
        {
            Key         = notification.Key,
            Time        = notification.Time.ToUnixTimeMilliseconds(),
            Icon        = notification.Icon,
            Title       = notification.Title,
            Description = notification.Description,
            Url         = notification.Url,
            Color       = notification.Color
        };
    }
}