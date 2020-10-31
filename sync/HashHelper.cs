using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace GenshinSchedule.SyncServer
{
    public class HashHelper
    {
        const int _saltSize = 128 / 8;
        const int _hashSize = 256 / 8;

        public byte[] Hash(string str, byte[] salt = null)
        {
            salt ??= new byte[_saltSize];

            using (var random = RandomNumberGenerator.Create())
                random.GetBytes(salt);

            // best practice from microsoft: https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-3.1
            var hash = KeyDerivation.Pbkdf2(str, salt, KeyDerivationPrf.HMACSHA1, 10000, _hashSize);

            var buffer = new byte[_saltSize + _hashSize];

            Array.Copy(salt, 0, buffer, 0, _saltSize);
            Array.Copy(hash, 0, buffer, _saltSize, _hashSize);

            return buffer;
        }

        public bool Test(byte[] buffer, string str)
        {
            var salt = new byte[_saltSize];

            Array.Copy(buffer, 0, salt, 0, _saltSize);

            var a = ((Span<byte>) buffer).Slice(_saltSize);
            var b = Hash(str, salt);

            return a.SequenceEqual(b);
        }
    }
}