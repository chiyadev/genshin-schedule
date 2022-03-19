#!/bin/sh
# Builds docker images for release.
touch './.env'
set -a; . './.env'; set +a

docker build sync -t 'registry.chiya.dev/genshin-sync'
docker build web -t 'registry.chiya.dev/genshin-web' --build-arg NEXT_PUBLIC_UMAMI_URL --build-arg NEXT_PUBLIC_API_PUBLIC --build-arg NEXT_PUBLIC_API_INTERNAL
