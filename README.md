# Genshin Schedule

Genshin Schedule is a website to help you keep track of time-related game activities in Genshin Impact.

For more information, visit [genshin.chiya.dev](https://genshin.chiya.dev).

![home](images/home.png)

## Building from source

This website consists of two subprojects: `web` and `sync`

You may use the provided Dockerfiles ([web](Dockerfile.web) and [sync](Dockerfile.sync)) to generate production images, or follow the below steps to run the projects for development.

### Web Frontend

Frontend was bootstrapped using [create-react-app](https://github.com/facebook/create-react-app).

Prerequisites:

- npm
- yarn

Steps:

1. Clone repo
2. `cd web && yarn && yarn start`

### Sync Backend

Backend is an [ASP.NET 5](https://devblogs.microsoft.com/dotnet/introducing-net-5/) C# project.

Prerequisites:

- .NET 5 SDK
- PostgreSQL

Steps:

1. Clone repo
2. `cd sync`
3. Create `appsettings.Production.json`

```json
{
  "Secret": "some random string",
  "ConnectionStrings": {
    "SyncDbContext": "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=genshin;"
  }
}
```

4. `dotnet run`
