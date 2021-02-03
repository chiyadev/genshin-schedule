using System;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Discord;
using Discord.WebSocket;
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

        public async Task RunAsync(DiscordShardedClient client, CancellationToken cancellationToken = default)
        {
            var delay = new AccurateDelay(TimeSpan.FromSeconds(5));

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

        async Task NotifyAsync(DiscordShardedClient client, SyncDbContext db, CancellationToken cancellationToken = default)
        {
            var time = DateTimeOffset.UtcNow;

            while (true)
            {
                var notifications = await db.Notifications.Include(n => n.User).Where(n => n.Time <= time).OrderBy(n => n.Time).Take(50).ToListAsync(cancellationToken);

                if (notifications.Count == 0)
                    break;

                await Task.WhenAll(notifications.Select(async notification =>
                {
                    try
                    {
                        await SendAsync(client, notification);
                    }
                    catch (Exception e)
                    {
                        _logger.LogWarning(e, $"Could not send notification '{notification.Key}' to user {notification.User.DiscordUserId}.");
                    }
                }));

                db.RemoveRange(notifications);

                await db.SaveChangesAsync(cancellationToken);

                _logger.LogInformation($"Removed {notifications.Count} notifications from queue.");
            }
        }

        async Task SendAsync(DiscordShardedClient client, DbNotification notification)
        {
            var recipientId = notification.User.DiscordUserId;

            if (recipientId == null)
                return;

            // use rest to retrieve user because users are not cached in sharded clients
            var recipient = await client.Rest.GetUserAsync(recipientId.Value);

            if (recipient == null)
            {
                _logger.LogWarning($"Recipient user {recipientId} not found.");
                return;
            }

            await recipient.SendMessageAsync("", embed: new EmbedBuilder
            {
                Author = new EmbedAuthorBuilder
                {
                    Name    = notification.Title,
                    Url     = notification.Url,
                    IconUrl = notification.Icon
                },
                Description = notification.Description,

                Color = uint.TryParse(notification.Color?.TrimStart('#'), NumberStyles.HexNumber, null, out var c) ? new Color(c) : null as Color?
            }.Build());

            _logger.LogInformation($"Successfully sent notification '{notification.Key}' to user {recipient.Id}.");
        }
    }
}