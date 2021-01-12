using System;
using System.Threading.Tasks;
using GenshinSchedule.SyncServer.Database;
using GenshinSchedule.SyncServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GenshinSchedule.SyncServer.Controllers
{
    [ApiController, Route("users"), Authorize]
    public class UserController : ControllerBase
    {
        readonly SyncDbContext _db;
        readonly AuthHelper _auth;
        readonly ILogger<UserController> _logger;

        public UserController(SyncDbContext db, AuthHelper auth, ILogger<UserController> logger)
        {
            _db     = db;
            _auth   = auth;
            _logger = logger;
        }

        /// <summary>
        /// Authenticates as another user bypassing the usual password check.
        /// This endpoint is restricted to administrators.
        /// </summary>
        [HttpGet("{username}/auth")]
        public async Task<ActionResult<AuthResponse>> AuthAsync(string username)
        {
            var adminId = HttpContext.GetUserId();

            try
            {
                var admin = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == adminId);

                if (admin == null || !admin.IsAdmin)
                    return Forbid();

                var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return NotFound($"User '{username}' not found.");

                return Ok(new AuthResponse
                {
                    Token = _auth.CreateToken(user),
                    User  = Models.User.FromDbModel(user)
                });
            }
            catch (Exception e)
            {
                var message = $"Could not authenticate as user '{username}'.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }
    }
}