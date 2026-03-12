# TGNext

**把你的 Telegram Channel 变成轻量微博客。**

简体中文 | [English](./README.en.md)

---

## 概览

TGNext 是一个基于 Astro SSR 的轻量化站点生成器，直接把 Telegram 频道内容转成可订阅、可搜索、可标签化的微型博客站点。

- Cloudflare Pages / Netlify / Vercel 可直接部署
- 主题与暗黑模式内置，支持一键切换
- 关键词过滤（变量优先）贯穿列表、详情、RSS、Sitemap

---

## 功能亮点

- **Telegram 频道即 CMS**：无需后台，直接抓取频道内容
- **SEO 友好**：`/sitemap.xml` + `noindex` 规则支持
- **最小化 JS**：仅主题切换与可选高亮
- **RSS 与 RSS JSON**：`/rss.xml` / `/rss.json`
- **主题系统**：3 套主题 + 暗黑模式
- **关键词过滤**：环境变量与设置页双通道
- **搜索 / 标签 / 归档**：内置搜索页与标签聚合

---

## 快速开始

1. 克隆仓库
   - `git clone https://github.com/wintopic/TGNext.git`
2. 安装依赖
   - `pnpm install`
3. 启动开发
   - `pnpm dev`
4. 打开浏览器
   - `http://localhost:4321`

---

## 部署（Cloudflare Pages 推荐）

### Cloudflare Pages

1. 在 GitHub 上创建 TGNext 项目
2. 在 Cloudflare Pages 新建项目，选择 `Astro`
3. 配置环境变量 `CHANNEL`
4. 保存并部署

### Netlify / Vercel

流程与 Cloudflare Pages 类似，选择 `Astro` 并配置 `CHANNEL` 即可。

---

## Docker

1. `docker build -t tgnext .`
2. `docker run -d --name tgnext -p 4321:4321 -e CHANNEL=your_channel tgnext`

如果启用仓库内置 GitHub Actions，镜像会发布到：
`ghcr.io/<owner>/tgnext:main`

---

## 配置

将 `.env.example` 复制为 `.env`，至少需要配置 `CHANNEL`。

### 必填

| 变量      | 说明                | 示例           |
| --------- | ------------------- | -------------- |
| `CHANNEL` | Telegram 频道用户名 | `your_channel` |

### 基础配置

| 变量       | 说明             | 默认/示例                   |
| ---------- | ---------------- | --------------------------- |
| `LOCALE`   | 语言             | `zh-cn`                     |
| `TIMEZONE` | 时区             | `Asia/Shanghai`             |
| `TELEGRAM` | Telegram 用户名  | `your_telegram`             |
| `TWITTER`  | X/Twitter 用户名 | `your_twitter`              |
| `GITHUB`   | GitHub 用户名    | `your_github`               |
| `MASTODON` | Mastodon 地址    | `mastodon.social/@Mastodon` |
| `BLUESKY`  | Bluesky Handle   | `bsky.app`                  |
| `DISCORD`  | Discord 链接     | `https://discord.com/...`   |
| `PODCAST`  | Podcast 链接     | `https://podcast.com/...`   |

### SEO / 展示

| 变量                 | 说明            | 默认              |
| -------------------- | --------------- | ----------------- |
| `NO_FOLLOW`          | 禁止爬虫跟踪    | `false`           |
| `NO_INDEX`           | 禁止收录        | `false`           |
| `HIDE_DESCRIPTION`   | 隐藏频道简介    | `false`           |
| `GOOGLE_SEARCH_SITE` | Google 站内搜索 | `your-domain.com` |

### 关键词过滤（全站生效）

| 变量              | 说明                             | 示例            |
| ----------------- | -------------------------------- | --------------- |
| `FILTER_KEYWORDS` | 过滤关键词（逗号/分号/换行分隔） | `spam,ads,nsfw` |

匹配规则：大小写不敏感的包含匹配，覆盖 `title` / `text` / `tags`。

### 其他

| 变量            | 说明                   | 示例                     |
| --------------- | ---------------------- | ------------------------ |
| `TAGS`          | 标签页启用（逗号分隔） | `tag1,tag2`              |
| `COMMENTS`      | 评论开关               | `true`                   |
| `REACTIONS`     | Reactions 开关         | `true`                   |
| `LINKS`         | Links 页面列表         | `Title,URL;Title2,URL2;` |
| `NAVS`          | 侧边栏导航             | `Title,URL;Title2,URL2;` |
| `RSS_BEAUTIFY`  | RSS 美化               | `true`                   |
| `FOOTER_INJECT` | Footer 注入            | HTML                     |
| `HEADER_INJECT` | Header 注入            | HTML                     |

---

## 设置页与优先级

- `/settings` 可设置 **目标频道** 与 **关键词过滤**
- 设置结果保存在 Cookie 中
- 若环境变量 `CHANNEL` / `FILTER_KEYWORDS` 已配置，则设置页对应字段会被禁用，并以环境变量为准

---

## 常见问题

**为什么部署后内容为空？**

- 频道必须是公开频道
- 用户名是字符串而不是数字
- 关闭频道的 “Restricting Saving Content”
- 修改环境变量后需要重新部署
- 部分敏感频道可能被 Telegram 限制展示

---

## 许可协议

本项目使用 **AGPL-3.0-or-later** 许可证。

---

## 致谢

TGNext 基于 [BroadcastChannel](https://github.com/miantiao-me/BroadcastChannel) 进行改造。
