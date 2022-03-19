FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /genshin

COPY GenshinSchedule.SyncServer.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet build -c Release -o build --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /genshin

COPY --from=build /genshin/build ./

ENV ASPNETCORE_ENVIRONMENT Production
ENTRYPOINT ["dotnet", "GenshinSchedule.SyncServer.dll"]
