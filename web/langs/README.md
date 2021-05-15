# NOTE

> This document is outdated; we now use [GNU gettext](https://www.gnu.org/software/gettext/manual/gettext.html) `.po` and `.pot`-based translation workflow instead of editing raw JSON files. (PR [#64](https://github.com/chiyadev/genshin-schedule/pull/64))
>
> Todo: update this tutorial

# Localization

This folder contains localization files that dictate how text is displayed on the website for a specific language.

## Adding a localization

When writing a localization file, you should refer to the default [en-US](en-US.json) localization file as an example of how certain fields should be localized.

We use [react-intl](https://formatjs.io/docs/react-intl/) as the localization framework, which means there is full support for the [ICU MessageFormat](https://unicode-org.github.io/icu/userguide/format_parse/) syntax. There are many tutorials and examples on Google to help you.

### Fallback fields

If a field is left unspecified, the website falls back to the `en-US` localization by default.

For example, if `en-US` contains:

```json
{
  "anemo": "Anemo",
  "traveler": "Traveler"
}
```

and `en-GB` contains:

```json
{
  "traveler": "Traveller"
}
```

the resulting localization is an object merge of the more specific localization into the default localization. i.e.

```json
{
  "anemo": "Anemo",
  "traveler": "Traveller"
}
```

which means if you are writing an `en-GB` localization, there is no need to specify the `anemo` field. It is automatically taken from `en-US`.

### Item names (unspecified fields)

You can also translate game item names if you are translating to a non-English language.

For example, if you are translating `Klee`, the field for her does not exist in `en-US`. This is because the key `"Klee"` already implies the value `"Klee"` when unspecified.

```json
{
  "Klee": "Klee"
  // implied
}
```

You can take advantage of this behavior to translate English item names to non-English names. e.g. `ja-JP`:

```json
{
  "Klee": "クレー"
}
```

## Testing a localization

Before [submitting](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) a localization, you should ensure that all fields have been translated and that they are both syntactically and semantically correct in the context of their usage.

You should follow the [development guide](../README.md#Local development) to start the website in your local environment. Don't forget to update [index.ts](index.ts) file to include your new localization in the listing.
