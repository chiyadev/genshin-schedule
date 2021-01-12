using System;
using System.Collections.Generic;

namespace GenshinSchedule.SyncServer.Database
{
    public class DbUser
    {
        public int Id { get; set; }

        public string Username { get; set; }
        public byte[] Password { get; set; }
        public DateTimeOffset CreatedTime { get; set; }
        public bool IsAdmin { get; set; }

        public ulong? DiscordUserId { get; set; }

        public DbWebData WebData { get; set; }
        public List<DbNotification> Notifications { get; set; }
    }
}