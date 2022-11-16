# Mish Friendly Food

Do you have dietary requirements or allergies? Do you travel a lot? :airplane: Then you'll :heart: this app.

<img src="https://user-images.githubusercontent.com/36594527/195074051-7af2c269-1442-4398-8a8d-470c3cc5c63b.png" height="100">
<img src="https://github.com/mishmanners/mish-friendly-food/blob/main/_files/Images/Logo/Logo%20FINAL.png" height="100">

Mish Friendly Food will translate your dietary requirements/allergies into any language 🤯. Enter your details and choose your desired language. Once you have your translation, you can get it printed on a cute card, or text the results to your phone. Next time you travel to foreign country, you can pull out your physical or digital card, and rest assured that your waiter, host, or chef, will know how to cater for you.

**[The website](https://mishfriendlyfood.com/) is now live** thanks to the contributions of this awesome community. You can find the website at [mishfriendlyfood.com](https://mishfriendlyfood.com/). Currently, the website only contains an About Page, and list of Translations. If you'd like to help with phase two of the project (search and retrieve; see [Phase Two](https://mishfriendlyfood.com/) below), then I could very much welcome any help :heart:.

## About

### Why Mish Friendly Food?

People with dietary restrictions and allergies should be able to travel and still eat!

I have a lot of dietary restrictions, and EVERY time I travel, I get into situations where people from other countries (and especially other languages), don't know what foods I'm talking about or what I'm allergic to. Google translate is great at translating some things, but it lacks depth. For example, in some parts of the world, it isn't known what gluten is (hint, it's not just croissants :croissant:. In others, "dairy" :cow: is something completely different than in Australia.

After talking (mostly constructively complaining) about this issue, I discovered I wasn't alone. So we came up with this idea to help us all while we travel. I wanted to name it something cool, but everyone said "go with Mish Friendly Food". This stuck, especially since most of my community already call the food I eat "Mish-friendly". At one conference in particular, one of the organisers even thought "Mish friendly" was actually a dietary type, in the same way "vegan friendly" or "coealic friendly" is (they even tried Googling "Mish Friendly Food" and informed me that they couldn't find whta this was. This situation prompted us to have a website to cater to the "Mish friendly" search criteria, but also help those people who - like me - struggle when travelling.

![tea large](https://user-images.githubusercontent.com/36594527/195094366-2ddb3c86-3dac-45fd-aa16-aedcc67b75fb.png)

### Contribution Guidelines

This project is a work in progress and I welcome any help. Check out the phases below and see how you might like to be involved.

All contributions will require a pull request. Please be respectful of everyone, and don't submit spammy PRs. This is a translation app, but we don't just want Google translate - we can get that from Google. We need to accurately be able to translate dietary requirements and allergies so that people don't get sick, or worse. Google translate does a good job, but it's not perfect. If you review or add a new language, please ensure it's added to the [list of supported languages](https://github.com/mishmanners/mish-friendly-food#supported-languages) as part of your pull request.

If you'd like to open and issue and assign yourself, you can do so by using `.take` in the issue comments. For example you could simply type ".take" as a comment, or you can write something like "I would like to .take this issue". You'll then be assigned to that issue so you can start working on it.

As for the database itself; categories are being used for when people group multiple things together. `Translation` is used for individual words being translated and includes synonyms. For example, "dairy" is translated to "lactose" in some countries, but not in others. So we need to be able to translate both "dairy" and "lactose" to the same word in the other language. The `dietary_restrictions` section is for the actual dietary restrictions and allergies. This is needed so we can translate the words accurately.

Please DO NOT submit pull requests for changes that only involve a few translations. If you want to help with translation, please add everything you know and not just one word. Ie. if you'd like to add the German translation, don't just add the translation for `vegetarian`. Please add translations for all the data in the database. Thank you :pray:.

## Project stages

The project will run in a few stages. Any help along the way is appreciated.

### Phase 1 - Building the Database

Firstly, to get this underway we need to build the database.

It will consist of the dietary groups such as "dairy, gluten, vegan, vegetarian" etc. The database will also include individual foods, such as pistachio, cashews, banana, mango, potato, etc. I am also wanting to including things like "also known as"; for example, rockmelon and cantelope are the same food in English; just called each of those names in different areas. The database should also include groups such as tree nuts, meat, etc. which can be assigned to each of the individual foods.

Once the basic database is built, we need people with authority (ie. people who know the language) to translate it into other languages.

### Phase 2 - Translate

Now we'll need to build the app capability to actual translate the database. Users should be able to submit their data in two ways:

- tick boxes (ie. gluten free)
- text dump

Once the user has submitted the data, they should get a result back in their desired language. This can be shown on the screen as text.

### Phase 3 - Beautify and export

People will want to be able to export their translations into cute cards. There should be a blank card as well as a couple of basic artistic styles to choose from. Users should be able to change the font colour and size and finally export their image as a *.png, *.jpeg, *.pdf. Thus users will have a digital card they can show when travelling, or print it out for ease.

### Phase 4 - Twilio integration

Not everyone wants to export their translation or dietary into cute cards. Some might want to have it as an SMS. This phase will setup Twilio so users can have their result text messaged to them.

I'll also take any other crazy ideas too; just add them to the [Discussion thread](https://github.com/mishmanners/mish-friendly-food/discussions/65).

## Supported Languages

Thanks to a bunch of contributions, these are the currently supported languages:
- English
- Spanish
- Portuguese
- Russian
- Japansese
- Danish
- French
- Hindi
- Arabic

This list will be updated as more contributions are added. Other languages that you might see [in the database](https://github.com/mishmanners/mish-friendly-food/blob/main/_data/database.json), have been added by GitHub Copilot, thus they are yet to be reviewed. If you'd like to contribute (especially via reviewing the current translations), please do so.

## Running the Site

This site is built using [Astro](https://astro.build/) which is JavaScript based static site generator. If you'd like to setup and run the site locally, run the following commands:

- Install the node modules
```
npm install
```
- Start the development site
```
npm start
```

Once started the site should be accessible at `http://localhost:3000`, unless the console tells you another port to use.

### Add New Pages

Astro is really great at adding new pages, this site is setup to either take an Astro file (eg. `src/pages/translations.astro`) or a markdown file (eg. `src/pages/about.md`). If it's a simple content page, markdown works fine, if there's a bit more to it or you want to add styles to it then an Astro file is the best option.

### Styling

This site uses out of the box Astro styling which is "inline" CSS using CSS Modules and Post CSS. There's a couple of PostCSS plugins to make things nicer, but for the most part you can write CSS styling next to your HTML part and it'll work. Either classes or HTML tags work fine for CSS selectors, as it generates class names and scopes styles automagically for you.

```html
<style>
	footer {
		text-align: center;
	}
</style>

<footer>
	<p>Made with gluten-free, dairy-free love.</p>
</footer>

```

### Meta Info

Because meta info is super important for sharing stuff on socials, it's easy to edit the meta info of each page. In the frontmatter of the page, you can create a variable of the meta info (eg. title, description, etc) and pass it to the layout component. This then passes it down to the page itself.

```astro
---
import DefaultLayout from "../layouts/Default.astro";

const meta = {
	title: "Page title",
	description: "About this page",
};
---

<DefaultLayout {meta}>
  <!-- Content Here -->
</DefaultLayout>
```

If you don't give a page any meta info, it'll use the default stuff anyway.

## Thank yous

![LOVE_112px_TWITCH](https://user-images.githubusercontent.com/36594527/197941418-51f34871-5968-4bb2-8813-52e276ed4735.gif)

To EVERYONE who contributed to the project, you're amazing. To all those who've had to put up with my dietary requirements while travelling - you're all life-long friends, and hopefully this will make things better. To those who were with me at NDC in Oslo when we came up with this idea around the breakfast table - Amy, Damo, (and me :wink:)

Thanks to <a href="https://unsplash.com/@wistomsin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tom Barrett</a> via <a href="https://unsplash.com/s/photos/travel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> to the epic photo of the plane that we're using for the social card.
