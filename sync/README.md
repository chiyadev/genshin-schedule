# genshin-sync

This project is an [ASP.NET 5](https://devblogs.microsoft.com/dotnet/introducing-net-5/) C# project.

### Prerequisites

- [.NET 5+ SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
- [PostgreSQL 13+](https://www.postgresql.org/)

## Local development

To start a local development instance at: http://localhost:5000

Create `appsettings.Development.json` at the project root:

```json5
{
  "Secret": "genshin", // replace with some long and secure random string
  "ConnectionStrings": {
    "SyncDbContext": "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=genshin;"
  }
}
```

Run the following commands:

```shell
# Start a PostgreSQL instance with Docker
docker run -it --rm -p 5432:5432 -e POSTGRES_PASSWORD=genshin postgres:alpine

# Start server
ASPNETCORE_ENVIRONMENT=Development dotnet run
```

## Production build

To start a production instance at: http://0.0.0.0:80

```shell
# Compile project
dotnet build -c Release -o build

# Start server
cd build
dotnet GenshinSchedule.SyncServer.dll
```

The configuration file `appsettings.Production.json` is assumed to exist in the working directory. It can be created beforehand, or mounted using `-v` when using Docker.

Refer to the [Dockerfile](../Dockerfile.sync) which is a more advanced production build script.

## Using different databases

Only PostgreSQL connection strings are accepted at the moment.

It is possible to use other [database providers](https://docs.microsoft.com/en-us/ef/core/providers) supported by EF Core. You will need to edit [this line](https://github.com/chiyadev/genshin-schedule/blob/master/sync/Startup.cs#L30) and build from source.
