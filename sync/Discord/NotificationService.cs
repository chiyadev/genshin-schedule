using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Discord;
using GenshinSchedule.SyncServer.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace GenshinSchedule.SyncServer.Discord
{
    public class NotificationService
    {
        readonly IServiceProvider _services;
        readonly ILogger<NotificationService> _logger;

        public NotificationService(IServiceProvider services, ILogger<NotificationService> logger)
        {
            _services = services;
            _logger   = logger;
        }

        public async Task RunAsync(IDiscordClient client, CancellationToken cancellationToken = default)
        {
            var delay = new AccurateDelay(TimeSpan.FromMinutes(1));

            while (!cancellationToken.IsCancellationRequested)
            {
                using (var scope = _services.CreateScope())
                await using (var db = scope.ServiceProvider.GetService<SyncDbContext>())
                {
                    try
                    {
                        await NotifyAsync(client, db, cancellationToken);
                    }
                    catch (Exception e)
                    {
                        _logger.LogWarning(e, "Could not send notifications.");
                    }
                }

                await delay.DelayAsync(cancellationToken);
            }
        }

        async Task NotifyAsync(IDiscordClient client, SyncDbContext db, CancellationToken cancellationToken = default)
        {
            var time = DateTimeOffset.UtcNow;

            while (true)
            {
                var notifications = await db.Notifications.Include(n => n.User).Where(n => n.Time <= time).OrderBy(n => n.Time).Take(100).ToListAsync(cancellationToken);

                foreach (var notification in notifications)
                {
                    _logger.LogWarning($"sending notification {notification.Description}");
                }

                break;
            }
        }
    }
}