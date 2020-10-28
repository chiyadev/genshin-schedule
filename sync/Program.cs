using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace GenshinSchedule.SyncServer
{
    public class Program
    {
        public static async Task Main(string[] args)
            => await CreateHostBuilder(args).Build().RunAsync();

        public static IWebHostBuilder CreateHostBuilder(string[] args)
            => WebHost.CreateDefaultBuilder<Startup>(args);
    }
}