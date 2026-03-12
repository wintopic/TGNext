# TGNext

**Turn your Telegram Channel into a MicroBlog.**

---

English | [简体中文](./README.md)

## ✨ Features

- **Turn your Telegram Channel into a MicroBlog**
- **SEO friendly** `/sitemap.xml`
- **Minimal JS on the browser side** (theme switch + optional highlight)
- **RSS and RSS JSON** `/rss.xml` `/rss.json`
- **Themes** 3 presets + dark mode
- **Keyword filters** via env + settings page

## 🪧 Demo

- Deploy your own TGNext on Cloudflare Pages, Netlify, or Vercel.

### Platform

- Cloudflare Pages (recommended)
- Netlify
- Vercel

TGNext supports deployment on serverless platforms like Cloudflare, Netlify, Vercel that support Node.js SSR, or on a VPS.
For detailed tutorials, see [Deploy your Astro site](https://docs.astro.build/en/guides/deploy/).

## 🧱 Tech Stack

- Framework: [Astro](https://astro.build/)
- CMS: [Telegram Channels](https://telegram.org/tour/channels)
- Template: [Sepia](https://github.com/Planetable/SiteTemplateSepia)

## 🙏 Credits

TGNext is a fork of [BroadcastChannel](https://github.com/miantiao-me/BroadcastChannel).

## 🏗️ Deployment

### Docker

1. `docker build -t tgnext .`
2. `docker run -d --name tgnext -p 4321:4321 -e CHANNEL=your_channel tgnext`

If you enable the included GitHub Actions workflow, images will be published to:
`ghcr.io/<owner>/tgnext:main`

### Serverless

1. Fork this project to your GitHub (or use it as a template)
2. Create a project on Cloudflare/Netlify/Vercel
3. Select the `TGNext` project and the `Astro` framework
4. Configure the environment variable `CHANNEL` with your channel name. This is the minimal configuration, for more configurations see the options below
5. Save and deploy
6. Bind a domain (optional).
7. Update code, refer to the official GitHub documentation [Syncing a fork branch from the web UI](https://docs.github.com/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui).

## ⚒️ Configuration

```env
## Telegram Channel Username, must be configured. The string of characters following t.me/
CHANNEL=your_channel

## Language and timezone settings, language options see [dayjs](https://github.com/iamkun/dayjs/tree/dev/src/locale)
LOCALE=en
TIMEZONE=America/New_York

## Social media usernames
TELEGRAM=your_telegram
TWITTER=your_twitter
GITHUB=your_github
MASTODON=mastodon.social/@Mastodon
BLUESKY=bsky.app

## The following two social media need to be URLs
DISCORD=https://DISCORD.com
PODCAST=https://PODCAST.com

## Header and footer code injection, supports HTML
FOOTER_INJECT=FOOTER_INJECT
HEADER_INJECT=HEADER_INJECT

## SEO configuration options, can prevent search engines from indexing content
NO_FOLLOW=false
NO_INDEX=false

## Hide Telegram channel description
HIDE_DESCRIPTION=false

## Sentry configuration options, collect server-side errors
SENTRY_AUTH_TOKEN=SENTRY_AUTH_TOKEN
SENTRY_DSN=SENTRY_DSN
SENTRY_PROJECT=SENTRY_PROJECT

## Telegram host name and static resource proxy, not recommended to modify
TELEGRAM_HOST=telegram.dog
STATIC_PROXY=

## Enable Google Site Search
GOOGLE_SEARCH_SITE=your-domain.com

## Enable tags page, separate tags with commas
TAGS=tag1,tag2,tag3

## Filter posts by keywords (comma/semicolon/newline separated)
FILTER_KEYWORDS=keyword1,keyword2,keyword3

## Show comments
COMMENTS=true

## Show reactions
REACTIONS=true

## List of links in the Links page, Separate using commas and semicolons
LINKS=Title1,URL1;Title2,URL3;Title3,URL3;

## Sidebar Navigation Item, Separate using commas and semicolons
NAVS=Title1,URL1;Title2,URL3;Title3,URL3;

## Enable RSS beautify
RSS_BEAUTIFY=true
```

## 🙋🏻 FAQs

1. Why is the content empty after deployment?
   - Check if the channel is public, it must be public
   - The channel username is a string, not a number
   - Turn off the "Restricting Saving Content" setting in the channel
   - Redeploy after modifying environment variables
   - Telegram blocks public display of some sensitive channels, you can verify by visiting `https://t.me/s/channelusername`.

## 🤝 Support

If TGNext helps you, please consider starring the repo and sharing it with others.
