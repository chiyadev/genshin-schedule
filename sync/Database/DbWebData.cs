using System;

namespace GenshinSchedule.SyncServer.Database
{
    public class DbWebData
    {
        public int Id { get; set; }

        public Guid Token { get; set; }
        public string Data { get; set; }
    }
}