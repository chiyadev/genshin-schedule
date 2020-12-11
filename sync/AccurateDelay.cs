using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace GenshinSchedule.SyncServer
{
    public sealed class AccurateDelay
    {
        readonly TimeSpan _interval;
        readonly Stopwatch _watch;

        public AccurateDelay(TimeSpan interval)
        {
            _interval = interval;
            _watch    = Stopwatch.StartNew();
        }

        public async Task DelayAsync(CancellationToken cancellationToken = default)
        {
            var delay = _interval - _watch.Elapsed;

            if (delay.Ticks > 0)
                await Task.Delay(delay, cancellationToken);

            _watch.Restart();
        }
    }
}