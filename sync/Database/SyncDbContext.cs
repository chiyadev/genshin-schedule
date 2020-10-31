using Microsoft.EntityFrameworkCore;

namespace GenshinSchedule.SyncServer.Database
{
    public class SyncDbContext : DbContext
    {
        public DbSet<DbUser> Users { get; set; }
        public DbSet<DbWebData> WebData { get; set; }

        public SyncDbContext(DbContextOptions<SyncDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUser>(user => user.HasIndex(u => u.Username).IsUnique());
            modelBuilder.Entity<DbWebData>(data => data.HasIndex(d => d.Token).IsUnique());
        }
    }
}