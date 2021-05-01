# Localization

This folder contains localization files that dictate how text is displayed on the website for a specific language.

## Adding a localization

When writing a localization file, you should refer to the default [en-US](en-US.json) localization file as an example of how certain fields should be localized.

We use [react-intl](https://formatjs.io/docs/react-intl/) as the localization framework, which means there is full support for the [ICU MessageFormat](https://unicode-org.github.io/icu/userguide/format_parse/) syntax. There are many tutorials and examples on Google to help you.

Note that if a field is left unspecified, the website falls back to the `en-US` localization by default.

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

which means if you are writing an `en-GB` localization, there is no need to specify the `anemo` field.

## Testing a localization

Before [submitting](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) a localization, you should ensure that all fields have been translated and that they are both syntactically and semantically correct in the context of their usage.

You should follow the [development guide](../README.md#Local development) to start the website in your local environment.  Don't forget to update [index.ts](index.ts) file to include your new localization in the listing.
