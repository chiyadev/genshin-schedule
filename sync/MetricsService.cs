using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Prometheus;
using Prometheus.DotNetRuntime;

namespace GenshinSchedule.SyncServer
{
    public interface IMetricsService : IHostedService { }

    public class MetricsService : BackgroundService, IMetricsService
    {
        public const int Port = 9802;

        readonly ILogger<MetricsService> _logger;
        readonly KestrelMetricServer _server;
        readonly IDisposable _runtimeStats;

        public MetricsService(ILogger<MetricsService> logger)
        {
            _logger       = logger;
            _server       = new KestrelMetricServer(Port);
            _runtimeStats = DotNetRuntimeStatsBuilder.Default().StartCollecting();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (_server == null)
                return;

            _logger.LogInformation($"Publishing Prometheus metrics on port {Port}.");

            _server.Start();

            try
            {
                await Task.Delay(-1, stoppingToken);
            }
            finally
            {
                await _server.StopAsync();
            }
        }

        public override void Dispose()
        {
            base.Dispose();

            _runtimeStats.Dispose();
        }
    }
}