# Localization

This folder contains localization files that dictate how text is displayed on the website for a specific language.

We use [react-intl](https://formatjs.io/docs/react-intl/) as the localization framework. Using [extract.js](extract.js) script to extract all localizable texts to [en_US.pot](en_US.pot) file. After translated to other language, [generate.js](generate.js) script is used to generate `.json` files from `.po` files.

react-intl uses [ICU MessageFormat](https://unicode-org.github.io/icu/userguide/format_parse/) syntax, a basic understanding of this syntax is necessary. There are many tutorials and examples on Google to help you.

We also have a project on [Weblate](https://hosted.weblate.org/projects/genshin-schedule/web/), a continuous translation platform where anyone can sign up for free and contribute without much technical knowledge.

## Adding a localization

When translating to other language, you should refer to the [en_US.pot](en_US.pot) template file as an example of how certain fields should be localized.

You can use [Poedit](https://poedit.net/) to create `.po` file from `en_US.pot` and edit. Or just copy it and edit using a text editor.

### Fallback fields

If a field is left unspecified or marked as fuzzy, the website falls back to the `en_US` localization by default.

For example, if `en_US.pot` contains:

```po
msgctxt "components.Auth.UserSignIn.242220"
msgid "Username"
msgstr ""

msgctxt "db.characters.d09c64"
msgid "Traveler (Anemo)"
msgstr ""

msgctxt "db.characters.d9c480"
msgid "Keqing"
msgstr ""
```

and `en_GB.po` contains:

```po
#, fuzzy
msgctxt "components.Auth.UserSignIn.242220"
msgid "Username"
msgstr "User..."

msgctxt "db.characters.d09c64"
msgid "Traveler (Anemo)"
msgstr "Traveller (Anemo)"

msgctxt "db.characters.d9c480"
msgid "Keqing"
msgstr ""
```

the resulting localization is an object merge of the more specific localization into the default localization. i.e.

```json
{
  "components.Auth.UserSignIn.242220": "Username",
  "db.characters.d09c64": "Traveller (Anemo)",
  "db.characters.d9c480": "Keqing"
}
```

which means if you are writing an `en_GB` localization, there is no need to translate the `Keqing` text. It is automatically taken from `en_US`.

## Testing a localization

Before [submitting](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) a localization, you should ensure that all fields have been translated and that they are both syntactically and semantically correct in the context of their usage.

You should follow the [development guide](../README.md#Local development) to start the website in your local environment. Don't forget to update [index.ts](index.ts) file to include your new localization in the listing.
