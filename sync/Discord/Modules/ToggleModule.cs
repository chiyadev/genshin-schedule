using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using GenshinSchedule.SyncServer.Database;
using Microsoft.EntityFrameworkCore;

namespace GenshinSchedule.SyncServer.Discord.Modules
{
    public class ToggleModule : ModuleBase
    {
        readonly AuthHelper _auth;
        readonly SyncDbContext _db;

        public ToggleModule(AuthHelper auth, SyncDbContext db)
        {
            _auth = auth;
            _db   = db;
        }

        static readonly Regex _tokenRegex = new Regex(@"^\|\|(?<token>.*)\|\|$", RegexOptions.Compiled | RegexOptions.Singleline);

        [Command("enable")]
        public async Task EnableAsync([Remainder] string arg)
        {
            if (_auth.TryValidateToken(_tokenRegex.Match(arg).Groups["token"].Value, out var payload))
            {
                var user = await _db.Users.AsTracking().FirstOrDefaultAsync(u => u.Id == payload.Id);

                if (user != null)
                {
                    user.DiscordUserId = Context.User.Id;

                    await _db.SaveChangesAsync();

                    await Context.Message.AddReactionAsync(new Emoji("\u2705"));
                    await ReplyAsync("Success. Future notifications will be sent to you via DM!");

                    return;
                }
            }

            await ReplyAsync("Token is invalid. Please refer to <https://genshin.chiya.dev/home/notifications> for help!");
        }

        [Command("disable")]
        public async Task DisableAsync()
        {
            var user = await _db.Users.AsTracking().FirstOrDefaultAsync(u => u.DiscordUserId == Context.User.Id);

            if (user == null)
            {
                await ReplyAsync("Notifications are not enabled for you.");
            }
            else
            {
                user.DiscordUserId = null;

                await _db.SaveChangesAsync();

                await Context.Message.AddReactionAsync(new Emoji("\u2705"));
                await ReplyAsync("Success. Paimon won't send you notifications anymore :(");
            }
        }
    }
}