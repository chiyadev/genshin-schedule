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
        /// Finds a user based on their username.
        /// This endpoint is restricted to administrators.
        /// </summary>
        [HttpPost("find")]
        public async Task<ActionResult<User>> FindAsync(FindUserRequest request)
        {
            var adminId = HttpContext.GetUserId();

            try
            {
                var admin = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == adminId);

                if (admin == null || !admin.IsAdmin)
                    return Forbid();

                var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == request.Username);

                if (user == null)
                    return NotFound($"Username '{request.Username}' not found.");

                return Models.User.FromDbModel(user);
            }
            catch (Exception e)
            {
                var message = $"Could not find user by username '{request.Username}'.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }

        /// <summary>
        /// Authenticates as another user bypassing the usual password check.
        /// This endpoint is restricted to administrators.
        /// </summary>
        [HttpGet("{id}/auth")]
        public async Task<ActionResult<AuthResponse>> AuthAsync(int id)
        {
            var adminId = HttpContext.GetUserId();

            try
            {
                var admin = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == adminId);

                if (admin == null || !admin.IsAdmin)
                    return Forbid();

                var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                    return NotFound($"User {id} not found.");

                return Ok(new AuthResponse
                {
                    Token = _auth.CreateToken(user),
                    User  = Models.User.FromDbModel(user)
                });
            }
            catch (Exception e)
            {
                var message = $"Could not authenticate as user by ID {id}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }
    }
}