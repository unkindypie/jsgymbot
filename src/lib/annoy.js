const fs = require('fs');
const path = require('path');
const pickone = require('../lib/pickone');

const articles = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../data.json')).toString()
);

module.exports = async (slimbot, subscriber, text) => {
  const sub = subscriber;
  if (sub.currentProgress >= articles.length) {
    await slimbot.sendMessage(
      sub.chatId,
      'So you read all the articles...' +
        ' You really think that you know js now? TIME TO READ IT AGAIN.'
    );
    sub.currentProgress = 0;
    await sub.save();
  }
  await slimbot.sendMessage(
    sub.chatId,
    `${
      text ||
      pickone([
        `Time to annoy you. Read 10x times or die.`,
        `READ.`,
        `Uchi js, kst.`,
        `Bot used uchi js! It's super effective!`,
        `Time to take a break and complete a short exercise🧘‍♀️
      10x each side`,
        `Js can't learn itself. LEARN JS, BAKA.`,
        `${sub.name}.knowsJS === true ? say('good human') : `,
      ])
    }\n ${articles[sub.currentProgress]}`
  );
  sub.currentProgress++;
  await sub.save();
};
