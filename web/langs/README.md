# Localization

This folder contains localization files that dictate how text is displayed on the website for a specific language.

We use [react-intl](https://formatjs.io/docs/react-intl/) as the localization framework. [extract.js](extract.js) script is used to extract all localizable text in the codebase to [en_US.pot](en_US.pot) localization template file. After the template is localized to another language, [generate.js](generate.js) script is used to generate `.json` files from `.po` files, which makes the localized strings accessible at runtime.

react-intl uses [ICU MessageFormat](https://unicode-org.github.io/icu/userguide/format_parse/) syntax; a basic understanding of this syntax is necessary. There are many tutorials and examples on Google to help you.

## Using Weblate

We have a [project on Weblate](https://hosted.weblate.org/projects/genshin-schedule/web/), a continuous translation platform where anyone can sign up for free and contribute without much technical knowledge. This method is usually preferred over submitting localization manually via pull requests.

## Manual translation

You can use any text editor to edit `.po` and `.pot` files. Specialized editors such as [Poedit](https://poedit.net/) are also a popular choice.

Before [submitting](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) a localization, you should ensure that all fields have been translated and that they are both syntactically and semantically correct in the context of their usage.

You should follow the [development guide](../README.md#Local development) to start the website in your local environment to test localizations. Don't forget to update [index.ts](index.ts) file to include your new localization in the listing!
