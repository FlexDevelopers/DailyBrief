<p align="center">
  <img src="https://i.ibb.co/9HZhZW2v/Daily-Briefpic.jpg" alt="DailyBrief Banner" width="100%" />
</p>

<h1 align="center">DailyBrief Telegram Bot</h1>

<p align="center">
  <b>Your instant Sinhala & Global News Assistant on Telegram</b>
</p>

<p align="center">
  <a href="https://t.me/theDailyBriefBot">
    <img src="https://img.shields.io/badge/Telegram-Bot-blue?logo=telegram" alt="Telegram Bot">
  </a>
  <a href="https://t.me/FlexDevelopers">
    <img src="https://img.shields.io/badge/Telegram-Channel-blue?logo=telegram" alt="Telegram Channel">
  </a>
  <a href="https://github.com/FlexDevelopers/DailyBrief/">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?logo=github" alt="GitHub Repo">
  </a>
  <a href="https://pella.app">
    <img src="https://img.shields.io/badge/Host%20on-Pella-green?logo=vercel" alt="Pella Host">
  </a>
</p>

---

## Features

- **/news** — Trending top headlines globally
- **/news [query]** — News by keyword or category (e.g., `/news tech`)
- **/bbcsinhala** — Latest Sinhala news from BBC (via RapidAPI)
- **/start** — Welcome message with image and buttons
- **/about** — Info + Portfolio + GitHub
- **Next/Previous** — Inline navigation replaces previous message

---

## Commands

| Command          | Description                                      |
|------------------|--------------------------------------------------|
| `/start`         | Welcome message with navigation buttons          |
| `/news`          | Trending world news                              |
| `/news tech`     | Search category/keyword-based news               |
| `/bbcsinhala`    | Sinhala news from BBC                            |
| `/about`         | About, portfolio, GitHub, and more               |

---

## API Providers

### 1. **NewsAPI.org** (Global News)

- Endpoint: `https://newsapi.org/v2/top-headlines`
- Free plan available
- Sign up at: https://newsapi.org/

### 2. **RapidAPI - BBC Sinhala**

- Endpoint: `https://latest-sri-lankan-news.p.rapidapi.com/latest-news/bbcsinhala`
- Sign up at: https://rapidapi.com/
- Use headers:
  ```js
  headers: {
    'x-rapidapi-host': 'latest-sri-lankan-news.p.rapidapi.com',
    'x-rapidapi-key': 'your_rapidapi_key'
  }


---

## Installation

Requirements

- Node.js ≥ v14
- Telegram Bot Token
- NewsAPI.org Key
- (Optional) RapidAPI Key


Setup Locally
```bash
git clone https://github.com/yourusername/DailyBrief.git
cd DailyBrief
npm install

Create .env file in root:

BOT_TOKEN=your_telegram_bot_token
NEWS_API_KEY=your_newsapi_key

Start bot:

node index.js
```

---

## Hosting Options

#### 1. Pella.app (Recommended)

- Create free Node.js project
- Upload all files
- Add .env with BOT_TOKEN and NEWS_API_KEY
- Auto 24/7 hosting

#### 2. Replit

- New Node.js Repl
- Upload files

Install packages:

- npm install
- Add .env from "Secrets" tab
- Enable Always On for 24/7

#### 3. VPS


---

## Environment Variables
```env
BOT_TOKEN=your_telegram_bot_token
NEWS_API_KEY=your_newsapi_key
```


---

## Screenshots


---

## Credits

- Developed by FlexDevelopers

- Telegram Bot: @theDailyBriefBot

- Hosting by Pella.app



---

## License

MIT © 2025 FlexDevelopers
