using System;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GenshinSchedule.SyncServer
{
    public class AuthOptions : AuthenticationSchemeOptions { }

    public class AuthHandler : AuthenticationHandler<AuthOptions>
    {
        public static readonly object PayloadKey = new object();
        public const string SchemeName = "Bearer";

        readonly AuthHelper _auth;
        readonly ILogger<AuthHandler> _logger;

        public AuthHandler(IOptionsMonitor<AuthOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, AuthHelper auth) : base(options, logger, encoder, clock)
        {
            _auth   = auth;
            _logger = logger.CreateLogger<AuthHandler>();
        }

        static readonly AuthenticationTicket _successTicket = new AuthenticationTicket(new ClaimsPrincipal(new ClaimsIdentity(null, SchemeName)), SchemeName);

#pragma warning disable 1998
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
#pragma warning restore 1998
        {
            try
            {
                if (!AuthenticationHeaderValue.TryParse(Request.Headers["Authorization"], out var authorization) || authorization.Scheme != Scheme.Name)
                    return AuthenticateResult.NoResult();

                if (!_auth.TryValidateToken(authorization.Parameter, out var payload))
                    return AuthenticateResult.Fail("Authorization failed.");

                Context.Items[PayloadKey] = payload;

                return AuthenticateResult.Success(_successTicket);
            }
            catch (Exception e)
            {
                _logger.LogWarning(e, "Authorization failed.");

                return AuthenticateResult.Fail("Authentication failed.");
            }
        }
    }

    public static class AuthHandlerExtensions
    {
        public static int GetUserId(this HttpContext context)
            => context.Items.TryGetValue(AuthHandler.PayloadKey, out var item) && item is AuthPayload payload ? payload.Id : 0;
    }
}