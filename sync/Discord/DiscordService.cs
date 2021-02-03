using System.Threading;
using System.Threading.Tasks;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GenshinSchedule.SyncServer.Discord
{
    public class DiscordService : BackgroundService
    {
        readonly IConfiguration _configuration;
        readonly CommandHandler _commands;
        readonly NotificationService _notification;
        readonly ILogger<DiscordService> _logger;

        public DiscordService(IConfiguration configuration, CommandHandler commands, NotificationService notification, ILogger<DiscordService> logger)
        {
            _configuration = configuration;
            _commands      = commands;
            _notification  = notification;
            _logger        = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var token = _configuration["Discord:Token"];

            if (string.IsNullOrEmpty(token))
                return;

            var client = new DiscordShardedClient(new DiscordSocketConfig
            {
                LogLevel         = LogSeverity.Debug,
                LargeThreshold   = 0,
                MessageCacheSize = 0
            });

            client.Log += log =>
            {
                _logger.Log(ConvertLogLevel(log.Severity), log.Exception, log.Message);
                return Task.CompletedTask;
            };

            client.MessageReceived += message =>
            {
                if (message is IUserMessage userMessage)
                    Task.Run(() => _commands.HandleAsync(client, userMessage), stoppingToken);

                return Task.CompletedTask;
            };

            await client.LoginAsync(TokenType.Bot, token);
            await client.StartAsync();

            await client.SetGameAsync("with travelers");

            try
            {
                if (bool.TryParse(_configuration["Discord:DisableNotifications"], out var disableNotification) && disableNotification)
                    await Task.Delay(-1, stoppingToken);
                else
                    await _notification.RunAsync(client, stoppingToken);
            }
            finally
            {
                await client.StopAsync();
            }
        }

        public static LogLevel ConvertLogLevel(LogSeverity level)
        {
            switch (level)
            {
                default:
                    return LogLevel.Trace;

                case LogSeverity.Verbose:
                    return LogLevel.Debug;

                case LogSeverity.Info:
                    return LogLevel.Information;

                case LogSeverity.Warning:
                    return LogLevel.Warning;

                case LogSeverity.Error:
                    return LogLevel.Error;

                case LogSeverity.Critical:
                    return LogLevel.Critical;
            }
        }
    }
}