using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using GenshinSchedule.SyncServer.Database;

namespace GenshinSchedule.SyncServer.Models
{
    public class WebData
    {
        [JsonPropertyName("token")]
        public Guid Token { get; set; }

        [JsonPropertyName("data")]
        public JsonDocument Data { get; set; }

        public static WebData FromDbModel(DbWebData data) => new WebData
        {
            Token = data.Token,
            Data  = JsonDocument.Parse(data.Data)
        };
    }
}