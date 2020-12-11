using Microsoft.EntityFrameworkCore;

namespace GenshinSchedule.SyncServer.Database
{
    public class SyncDbContext : DbContext
    {
        public DbSet<DbUser> Users { get; set; }
        public DbSet<DbWebData> WebData { get; set; }
        public DbSet<DbNotification> Notifications { get; set; }

        public SyncDbContext(DbContextOptions<SyncDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUser>(user =>
            {
                user.HasIndex(u => u.Username).IsUnique();
                user.HasIndex(u => u.DiscordUserId);
            });

            modelBuilder.Entity<DbWebData>(data => data.HasIndex(d => d.Token).IsUnique());

            modelBuilder.Entity<DbNotification>(notification =>
            {
                notification.HasIndex(n => n.Key);
                notification.HasIndex(n => n.Time);
            });
        }
    }
}