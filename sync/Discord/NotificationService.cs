using System;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Discord;
using Discord.Net;
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

        static readonly Uri _defaultBaseUri = new Uri("https://genshin.chiya.dev");

        async Task NotifyAsync(IDiscordClient client, SyncDbContext db, CancellationToken cancellationToken = default)
        {
            var time = DateTimeOffset.UtcNow;

            while (true)
            {
                var notifications = await db.Notifications.Include(n => n.User).Where(n => n.Time <= time).OrderBy(n => n.Time).Take(50).ToListAsync(cancellationToken);

                if (notifications.Count == 0)
                    break;

                await Task.WhenAll(notifications.Select(async notification =>
                {
                    var recipient = await client.GetUserAsync(notification.User.DiscordUserId ?? 0);

                    if (recipient == null)
                        return;

                    try
                    {
                        string fixUrl(string url)
                            => Uri.TryCreate(_defaultBaseUri, url, out var uri) ? uri.AbsoluteUri : null;

                        await recipient.SendMessageAsync("", embed: new EmbedBuilder
                        {
                            ThumbnailUrl = fixUrl(notification.Icon),
                            Title        = notification.Title,
                            Description  = notification.Description,
                            Url          = fixUrl(notification.Url),
                            Color        = uint.TryParse(notification.Color?.TrimStart('#'), NumberStyles.HexNumber, null, out var c) ? new Color(c) : null as Color?
                        }.Build());
                    }
                    catch (HttpException e)
                    {
                        switch (e.DiscordCode)
                        {
                            case 50007:
                                // blocked or cannot send
                                break;

                            default:
                                throw;
                        }
                    }
                    catch (Exception e)
                    {
                        _logger.LogWarning(e, $"Could not send notification '{notification.Key}' to user {recipient.Id}.");
                    }
                }));

                db.RemoveRange(notifications);

                await db.SaveChangesAsync(cancellationToken);
            }
        }
    }
}