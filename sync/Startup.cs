using GenshinSchedule.SyncServer.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GenshinSchedule.SyncServer
{
    public class Startup
    {
        readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                    .AddNewtonsoftJson();

            services.AddAuthentication(AuthHandler.SchemeName)
                    .AddScheme<AuthOptions, AuthHandler>(AuthHandler.SchemeName, null);

            services.AddDbContextPool<SyncDbContext>(options => options.UseNpgsql(_configuration.GetConnectionString(nameof(SyncDbContext))));

            services.AddSingleton<AuthHelper>()
                    .AddSingleton<HashHelper>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCors(cors => cors.AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowAnyOrigin());

            app.UseAuthentication();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}