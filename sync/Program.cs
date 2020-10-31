using System.Threading.Tasks;
using GenshinSchedule.SyncServer.Database;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace GenshinSchedule.SyncServer
{
    public static class Program
    {
        public static async Task Main(string[] args)
        {
            using var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            await using (var context = scope.ServiceProvider.GetRequiredService<SyncDbContext>())
                await context.Database.MigrateAsync();

            await host.RunAsync();
        }

        public static IWebHostBuilder CreateHostBuilder(string[] args)
            => WebHost.CreateDefaultBuilder<Startup>(args);
    }
}