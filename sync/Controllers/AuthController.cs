using System;
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
    [ApiController, Route("auth")]
    public class AuthController : ControllerBase
    {
        readonly SyncDbContext _db;
        readonly HashHelper _hash;
        readonly AuthHelper _auth;
        readonly ILogger<AuthController> _logger;

        public AuthController(SyncDbContext db, HashHelper hash, AuthHelper auth, ILogger<AuthController> logger)
        {
            _db     = db;
            _hash   = hash;
            _auth   = auth;
            _logger = logger;
        }

        /// <summary>
        /// Retrieves the currently authenticated user information.
        /// </summary>
        [HttpGet, Authorize]
        public async Task<ActionResult<User>> GetAsync()
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var user = await _db.Users.AsNoTracking().Include(u => u.WebData).FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    return Unauthorized();

                return Models.User.FromDbModel(user);
            }
            catch (Exception e)
            {
                var message = $"Could not retrieve user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }

        static readonly Counter _registrations = Metrics.CreateCounter("auth_registrations", "Number of new registrations.");
        static readonly Counter _authorizations = Metrics.CreateCounter("auth_authorizations", "Number of account authorizations.");

        /// <summary>
        /// Authenticates as an existing user, or creates a new user if one does not exist.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<AuthResponse>> PostAsync(AuthRequest request)
        {
            try
            {
                var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == request.Username);

                if (user == null)
                {
                    user = new DbUser
                    {
                        Username    = request.Username,
                        Password    = _hash.Hash(request.Password),
                        CreatedTime = DateTime.UtcNow,

                        WebData = new DbWebData
                        {
                            Token = Guid.NewGuid(),
                            Data  = "{}"
                        }
                    };

                    _db.Add(user);

                    await _db.SaveChangesAsync();

                    _logger.LogInformation($"Created user '{request.Username}'.");

                    _registrations.Inc();

                    // if user id is 1, set as admin
                    if (user.Id == 1)
                    {
                        user.IsAdmin = true;

                        await _db.SaveChangesAsync();
                    }
                }
                else
                {
                    if (!_hash.Test(user.Password, request.Password))
                        return Unauthorized("Invalid username or password.");

                    _authorizations.Inc();
                }

                return Ok(new AuthResponse
                {
                    Token = _auth.CreateToken(user),
                    User  = Models.User.FromDbModel(user)
                });
            }
            catch (Exception e)
            {
                var message = $"Could not authenticate user '{request.Username}'.";

                _logger.LogWarning(e, message);

                return BadRequest(message);
            }
        }

        /// <summary>
        /// Updates the currently authenticated user's credentials.
        /// </summary>
        [HttpPut, Authorize]
        public async Task<ActionResult<AuthResponse>> PutAsync(AuthRequest request)
        {
            var userId = HttpContext.GetUserId();

            try
            {
                var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    return Unauthorized();

                user.Username = request.Username;
                user.Password = _hash.Hash(request.Password);

                await _db.SaveChangesAsync();

                return Ok(new AuthResponse
                {
                    Token = _auth.CreateToken(user),
                    User  = Models.User.FromDbModel(user)
                });
            }
            catch (Exception e)
            {
                var message = e is DbUpdateException ? $"Username '{request.Username}' is already taken." : $"Could not update credentials for user {userId}.";

                _logger.LogWarning(e, message);

                return StatusCode(500, message);
            }
        }
    }
}