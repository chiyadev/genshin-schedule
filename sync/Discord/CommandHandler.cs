using System;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using GenshinSchedule.SyncServer.Discord.Modules;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace GenshinSchedule.SyncServer.Discord
{
    public class CommandHandler
    {
        readonly IServiceProvider _services;
        readonly ILogger<CommandHandler> _logger;

        readonly CommandService _commands;

        public CommandHandler(IServiceProvider services, ILogger<CommandHandler> logger)
        {
            _services = services;
            _logger   = logger;

            _commands = new CommandService(new CommandServiceConfig
            {
                LogLevel        = LogSeverity.Debug,
                IgnoreExtraArgs = true
            });

            _commands.Log += log =>
            {
                _logger.Log(DiscordService.ConvertLogLevel(log.Severity), log.Exception, log.Message);
                return Task.CompletedTask;
            };

            using var scope = services.CreateScope();

            _commands.AddModuleAsync<ToggleModule>(scope.ServiceProvider);
        }

        public async Task HandleAsync(DiscordShardedClient client, IUserMessage message)
        {
            if (!(message.Channel is IDMChannel))
                return;

            if (message.Author.IsBot || message.Author.IsWebhook)
                return;

            using var scope = _services.CreateScope();

            await _commands.ExecuteAsync(new CommandContext(client, message), 0, scope.ServiceProvider);
        }
    }
}