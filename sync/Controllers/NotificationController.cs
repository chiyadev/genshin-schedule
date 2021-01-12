using System;
using System.Linq;
using System.Threading.Tasks;
using GenshinSchedule.SyncServer.Database;
using GenshinSchedule.SyncServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Prometheus;

namespace GenshinSchedule.SyncServer.Controllers
{
    [ApiController, Route("notifications"), Authorize]
    public class NotificationController : ControllerBase
    {
        readonly SyncDbContext _db;
        readonly ILogger<NotificationController> _logger;

        public NotificationController(SyncDbContext db, ILogger<NotificationController> logger)
        {
            _db     = db;
            _logger = logger;
        }

        static readonly Counter _actions = Metrics.CreateCounter("notification_actions", "Number of notification actions.", new CounterConfiguration
        {
            LabelNames = new[] { "type" }
        });

        /// <summary>
        /// Retrieves all notifications in queue.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<Notification[]>> GetAsync()
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var notifications = await _db.Notifications.AsNoTracking().Where(n => n.User.Id == userId).ToListAsync();

                _actions.Labels("list").Inc();

                return Ok(notifications.Select(Notification.FromDbModel).ToArray());
            }
            catch (Exception e)
            {
                var message = $"Could not retrieve notifications for user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }

        /// <summary>
        /// Retrieves a notification in queue given its key.
        /// </summary>
        [HttpGet("{key}")]
        public async Task<ActionResult<Notification>> GetAsync(string key)
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var notification = await _db.Notifications.AsNoTracking().FirstOrDefaultAsync(n => n.User.Id == userId && n.Key == key);

                if (notification == null)
                    return NotFound($"Notification '{key}' not found.");

                _actions.Labels("get").Inc();

                return Ok(Notification.FromDbModel(notification));
            }
            catch (Exception e)
            {
                var message = $"Could not retrieve notification '{key}' for user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }

        /// <summary>
        /// Creates or updates a notification in queue.
        /// </summary>
        [HttpPut("{key}")]
        public async Task<ActionResult> PutAsync(string key, Notification model)
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var notification = await _db.Notifications.AsTracking().FirstOrDefaultAsync(n => n.User.Id == userId && n.Key == key);

                if (notification == null)
                    await _db.Notifications.AddAsync(notification = new DbNotification());

                notification.User = _db.Users.Attach(new DbUser { Id = userId }).Entity;

                notification.Key         = key;
                notification.Time        = DateTimeOffset.FromUnixTimeMilliseconds(model.Time);
                notification.Icon        = model.Icon;
                notification.Title       = model.Title;
                notification.Description = model.Description;
                notification.Url         = model.Url;
                notification.Color       = model.Color;

                await _db.SaveChangesAsync();

                _actions.Labels("set").Inc();

                return Ok($"Notification '{key}' updated.");
            }
            catch (Exception e)
            {
                var message = $"Could not update notification '{key}' for user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }

        [HttpDelete("{key}")]
        public async Task<ActionResult> DeleteAsync(string key)
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var notification = await _db.Notifications.AsTracking().FirstOrDefaultAsync(n => n.User.Id == userId && n.Key == key);

                if (notification != null)
                {
                    _db.Notifications.Remove(notification);

                    await _db.SaveChangesAsync();

                    _actions.Labels("delete").Inc();
                }

                return Ok($"Notification '{key}' deleted.");
            }
            catch (Exception e)
            {
                var message = $"Could not delete notification '{key}' for user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }
    }
}