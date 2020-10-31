using System;
using GenshinSchedule.SyncServer.Database;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GenshinSchedule.SyncServer.Models
{
    public class WebData
    {
        [JsonProperty("token")]
        public Guid Token { get; set; }

        [JsonProperty("data")]
        public JObject Data { get; set; }

        public static WebData FromDbModel(DbWebData data) => new WebData
        {
            Token = data.Token,
            Data  = JObject.Parse(data.Data)
        };
    }
}