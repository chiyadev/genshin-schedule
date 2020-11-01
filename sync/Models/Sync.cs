using System;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GenshinSchedule.SyncServer.Models
{
    public class SyncRequest
    {
        [JsonProperty("token")]
        public Guid Token { get; set; }

        [JsonProperty("patch")]
        public JsonPatchDocument<JObject> Patch { get; set; }
    }

    public class SyncResponse
    {
        [JsonProperty("token")]
        public Guid Token { get; set; }
    }
}