using System;
using System.Threading.Tasks;
using GenshinSchedule.SyncServer.Database;
using GenshinSchedule.SyncServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Prometheus;

namespace GenshinSchedule.SyncServer.Controllers
{
    [ApiController, Route("sync"), Authorize]
    public class SyncController : ControllerBase
    {
        readonly SyncDbContext _db;
        readonly ILogger<SyncController> _logger;

        public SyncController(SyncDbContext db, ILogger<SyncController> logger)
        {
            _db     = db;
            _logger = logger;
        }

        static readonly Counter _actions = Metrics.CreateCounter("sync_actions", "Number of sync data actions.", new CounterConfiguration
        {
            LabelNames = new[] { "type" }
        });

        /// <summary>
        /// Retrieves the latest synchronization data.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<WebData>> GetAsync()
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var user = await _db.Users.AsNoTracking().Include(u => u.WebData).FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    return Unauthorized();

                _actions.Labels("get").Inc();

                return Ok(WebData.FromDbModel(user.WebData));
            }
            catch (Exception e)
            {
                var message = $"Could not retrieve sync data for user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }

        /// <summary>
        /// Applies the given patches to synchronization data.
        /// </summary>
        [HttpPatch]
        public async Task<ActionResult> PatchAsync(SyncRequest request)
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var user = await _db.Users.Include(u => u.WebData).FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    return Unauthorized();

                var data = user.WebData;

                if (data.Token != request.Token)
                    return BadRequest(WebData.FromDbModel(data));

                try
                {
                    var current = JObject.Parse(data.Data);

                    request.Patch.ApplyTo(current);

                    data.Data = current.ToString(Formatting.None);
                }
                catch
                {
                    return BadRequest(WebData.FromDbModel(data));
                }

                data.Token = Guid.NewGuid();

                await _db.SaveChangesAsync();

                _actions.Labels("patch").Inc();

                return Ok(new SyncResponse
                {
                    Token = data.Token
                });
            }
            catch (Exception e)
            {
                var message = $"Could not patch sync data for user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }
    }
}