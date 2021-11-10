[English](README.md) | [简体中文](README_zh_CN.md)

[![CircleCI](https://circleci.com/gh/chiyadev/genshin-schedule.svg?style=svg)](https://app.circleci.com/pipelines/github/chiyadev)
[![Discord](https://img.shields.io/discord/786573740875841566.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/XdPQeEaBE7)
[![Maintainer](https://img.shields.io/badge/maintainer-phosphene47-pink)](https://github.com/phosphene47)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/chiyadev/genshin-schedule/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/chiyadev/genshin-schedule.svg)](https://GitHub.com/chiyadev/genshin-schedule/issues)
[![Contributors](https://img.shields.io/github/contributors/chiyadev/genshin-schedule.svg)](https://github.com/chiyadev/genshin-schedule/graphs/contributors)
[![Website](https://img.shields.io/website-up-down-green-red/https/genshin.chiya.dev.svg)](https://genshin.chiya.dev/)

# Genshin Schedule

Genshin Schedule is a website to help you keep track of time-related game activities in Genshin Impact.

For more information, visit [genshin.chiya.dev](https://genshin.chiya.dev).

![home](images/home.png)

## Contributions welcome!

The original author of this website ([phosphene47](https://github.com/phosphene47)) does not have much time to continue its development except for occasional database updates to stay up-to-date with the game. New feature implementations and bug fixes will be accepted via [pull requests](https://github.com/chiyadev/genshin-schedule/pulls), which are usually reviewed and merged within a week.

## Translations

We use [Weblate](https://hosted.weblate.org/projects/genshin-schedule/) for translations; see [here](https://github.com/chiyadev/genshin-schedule/blob/master/web/langs/README.md) for more information.

## Building from source

This website consists of two subprojects: [web](web) and [sync](sync)

- `web` frontend serving the website assets
- `sync` backend handling API requests

Navigate to the respective subproject directories for a detailed build procedure.

You may use the provided Dockerfiles ([web](Dockerfile.web) and [sync](Dockerfile.sync)) to generate production images.
