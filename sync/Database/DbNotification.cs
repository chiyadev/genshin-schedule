using System;

namespace GenshinSchedule.SyncServer.Database
{
    public class DbNotification
    {
        public int Id { get; set; }
        public string Key { get; set; }

        public DbUser User { get; set; }

        public DateTimeOffset Time { get; set; }
        public string Icon { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Color { get; set; }
    }
}