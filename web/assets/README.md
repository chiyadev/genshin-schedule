# Binary assets

This folder contains binary assets served by the website, which is mainly comprised of images associated with the game Genshin Impact.

## Adding new assets

New game assets can be added to the [game data](game) directory. The files can then be accessed by importing the named exports in [index.ts](). Refer to Next.js's [Image Optimization](https://nextjs.org/docs/basic-features/image-optimization#local-images) documentation for more information.

You must not manually modify the index file. `yarn genassets` should be run after adding new files, which regenerates the index file automatically.

### Automatic conversion of WebP

Since many browsers now download images in WebP instead of JPEG or PNG, `yarn genassets` automatically converts `.webp` files to `.png` for convenience. You must have [dwebp](https://developers.google.com/speed/webp/docs/dwebp) available in `$PATH`.

## Preferred source of assets

Game images are usually downloaded from the [Genshin Impact Wiki](https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki).

## Copyright notice

The [Genshin font](fonts/Genshin.woff) and all files in the [game data](game) directory are copyrighted assets of [miHoYo](https://mihoyo.com/). All other files are licensed under the [repository license](../../LICENSE) as usual unless otherwise noted.
