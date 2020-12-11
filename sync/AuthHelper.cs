using System;
using System.Security.Cryptography;
using System.Text;
using GenshinSchedule.SyncServer.Database;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace GenshinSchedule.SyncServer
{
    public class AuthPayload
    {
        [JsonProperty("id")]
        public int Id { get; set; }
    }

    public class AuthHelper
    {
        readonly IConfiguration _configuration;

        public AuthHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        string ComputeHash(byte[] data)
        {
            using var hmac = new HMACSHA256(Encoding.Default.GetBytes(_configuration["Secret"]));

            return WebEncoders.Base64UrlEncode(hmac.ComputeHash(data));
        }

        public string CreateToken(DbUser user) => CreateToken(new AuthPayload
        {
            Id = user.Id
        });

        public string CreateToken(AuthPayload payload)
        {
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payload));
            var hash = ComputeHash(data);

            return $"{WebEncoders.Base64UrlEncode(data)}.{hash}";
        }

        public bool TryValidateToken(string token, out AuthPayload payload)
        {
            payload = null;

            var parts = (token ?? "").Split(".");

            if (parts.Length != 2)
                return false;

            byte[] data;

            try
            {
                data = WebEncoders.Base64UrlDecode(parts[0]);
            }
            catch (FormatException)
            {
                return false;
            }

            var hash = parts[1];

            if (hash != ComputeHash(data))
                return false;

            payload = JsonConvert.DeserializeObject<AuthPayload>(Encoding.UTF8.GetString(data));
            return true;
        }
    }
}