# Genshin Schedule database

This directory contains the entire database of relational game entities including characters, items, regions, etc. It is comprised of regular Typescript files, which means data is hardcoded directly into the website as part of the build process.

There are a few rules you must follow when modifying this database.

## Use `registerMessage({ ... })` for user-exposed strings

`registerMessage({ defaultMessage: "..." })` is a special function that is detected by the build script. The value of `defaultMessage` is inserted into the [base localization file](../langs/en_US.pot) automatically, which allows for database localization.

This magical function does nothing other than simply [unwrapping](../utils/index.ts) the message string in the object.

It is syntactically similar to react-intl's [formatMessage](https://formatjs.io/docs/react-intl/api/#formatmessage) function which requires a React context and performs the actual localization lookups.

## Refer to items using collective names

When a logical item is not actually one item but instead comprised of multiple items of varying rarities, it should be referred to by the collective name.

For example, the character [Diluc](https://genshin-impact.fandom.com/wiki/Diluc) requires the common item [Recruit's Insignia](https://genshin-impact.fandom.com/wiki/Recruit%27s_Insignia) when ascending from levels [0, 2), [Sergeant's Insignia](https://genshin-impact.fandom.com/wiki/Sergeant%27s_Insignia) from levels [2, 4) and [Lieutenant's Insignia](https://genshin-impact.fandom.com/wiki/Lieutenant%27s_Insignia) from levels [4, 6).

Instead of referring to these rarities individually, they should be referred to by the collective name `Fatui Insignia`. For code examples, see how [characters](characters.ts) and [common materials](commonMaterials.ts) are declared.

## Ensure all entity relations are defined manually

Since Typescript is not SQL, you must ensure that all entity relations are defined manually. This can be achieved by going through all files in this directory iteratively after modifying the database.

For example, after you have added a new domain [Confront Stormterror](https://genshin-impact.fandom.com/wiki/Confront_Stormterror) to the database, you should double-check every file to ensure all relations is defined. You may have accidentally missed the relation between `Mondstadt` and `Confront Stormterror` in the [regions](regions.ts) file.
