const Slimbot = require('slimbot');

const pickone = require('./pickone');
const Message = require('../models/message');
const Subscriber = require('../models/subscriber');
const annoy = require('./annoy');

const slimbot = new Slimbot(process.env.TELEGRAM_API_KEY);

slimbot.on('message', async (message) => {
  let sub = await Subscriber.findOne({ telgeramId: message.from.id }).exec();

  let answer;
  if (!sub) {
    sub = new Subscriber({
      telgeramId: message.from.id,
      chatId: message.chat.id,
      name: message.from.first_name,
      currentProgress: 0,
    });
    await sub.save();
    answer =
      'Yo, baka. Now I will annoy you.' +
      'You are the chosen one. The chosen one to become a JAVASCRIPTizer!\n' +
      'When you would like to be notified?';
    await slimbot.sendMessage(message.chat.id, answer);
    setTimeout(async () => {
      await slimbot.sendMessage(
        message.chat.id,
        'Oh, you really thought that I would ask it? :3\n   YOU WILL GET THESE FUCKIN NOTIFICATIONS IN THE MOST INCONVINIENT TIME POSSIBLE, DUMBASS.'
      );
      annoy(slimbot, sub, `Let's start your torture.`);
    }, 5000);
  }

  const messageDoc = new Message({
    sender: sub._id,
    text: message.text,
    timestamp: message.date,
  });
  await messageDoc.save();

  if (answer) return;

  answer = pickone([
    `People who don't know js have no right to talk.`,
    `Shut up. I talk only to people who know js.`,
    `*angry bot noises*`,
    `...`,
    `You don't deserve to talk to me. Learn js, baka.`,
    `${sub.name}.knowsJS === false`,
    `${sub.name} instanceof Javascriptizer: false`,
  ]);

  await slimbot.sendMessage(message.chat.id, answer);
});

module.exports = {
  slimbot,
};
