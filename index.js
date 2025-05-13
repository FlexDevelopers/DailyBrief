// DailyBrief Telegram Bot (Node.js)
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Session memory
const userSessions = {};

// Helper to build navigation buttons
const buildNavigationButtons = (type, index) => {
  return {
    reply_markup: {
      inline_keyboard: [[
        { text: '◀️ Previous', callback_data: `${type}_prev_${index}` },
        { text: 'Next ▶️', callback_data: `${type}_next_${index}` }
      ]]
    }
  };
};

// Format news message
const formatNews = (article) => `
<b>${article.title}</b>

<a href="${article.url}">Read more</a>
`;

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const startImg = 'https://i.ibb.co/Mxxk7r1P/Daily-Brief.jpg';
  const caption = `<b>Welcome to DailyBriefBot!</b>\nStay updated with the latest trending and category news.\n\nUse /news or /bbcsinhala.`;

  bot.sendPhoto(chatId, startImg, {
    caption,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[
        { text: 'Join Telegram Channel', url: 'https://t.me/Flexdevelopers' }
      ]]
    }
  });
});

// /about command
bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;
  const img = 'https://i.ibb.co/9HZhZW2v/Daily-Briefpic.jpg';
  const caption = `<b>About DailyBriefBot</b>\nThis bot delivers latest headlines from NewsAPI and BBC Sinhala.\nBuilt by @FlexDevelopers.`;

  bot.sendPhoto(chatId, img, {
    caption,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[
        { text: 'Portfolio', url: 'https://www.tharu.mywire.org' },
        { text: 'GitHub', url: 'https://github.com/FlexDevelopers' }
      ]]
    }
  });
});

// /news and /news query
bot.onText(/\/news(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];
  const page = 0;
  let url = '';

  if (query) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  }

  try {
    const { data } = await axios.get(url);
    const articles = data.articles;
    if (!articles.length) return bot.sendMessage(chatId, 'No news found.');

    userSessions[chatId] = { articles, type: 'news' };
    const message = formatNews(articles[page]);
    bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: false,
      ...buildNavigationButtons('news', page)
    });
  } catch (err) {
    bot.sendMessage(chatId, 'Error fetching news.');
  }
});

// /bbcsinhala command
bot.onText(/\/bbcsinhala/, async (msg) => {
  const chatId = msg.chat.id;
  const page = 0;

  try {
    const { data } = await axios.get('https://latest-sri-lankan-news.p.rapidapi.com/latest-news/bbcsinhala', {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'latest-sri-lankan-news.p.rapidapi.com'
      }
    });

    const articles = data.latestContent;
    userSessions[chatId] = { articles, type: 'bbc' };

    const article = articles[page];
    const message = `<b>${article.title}</b>\n${article.date}\n<a href='${article.source}'>Read More</a>`;
    bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: false,
      ...buildNavigationButtons('bbc', page)
    });
  } catch (err) {
    bot.sendMessage(chatId, 'Error fetching BBC Sinhala news.');
  }
});

// Callback handler
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const [type, direction, index] = query.data.split('_');
  const session = userSessions[chatId];
  if (!session) return;

  let newIndex = parseInt(index);
  newIndex += direction === 'next' ? 1 : -1;

  if (newIndex < 0 || newIndex >= session.articles.length) return;

  const article = session.articles[newIndex];
  let message = '';

  if (type === 'news') {
    message = formatNews(article);
  } else if (type === 'bbc') {
    message = `<b>${article.title}</b>\n${article.date}\n<a href='${article.source}'>Read More</a>`;
  }

  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'HTML',
    disable_web_page_preview: false,
    ...buildNavigationButtons(type, newIndex)
  });
});

