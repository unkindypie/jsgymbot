require('dotenv').config();
require('./db/init');
const readLine = require('readline');
const cron = require('node-cron');

const { slimbot } = require('./lib/setupbot');
const annoy = require('./lib/annoy');

const Subscriber = require('./models/subscriber');

slimbot.startPolling();

const input = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

cron.schedule(
  '0 10,16 * * *',
  async () => {
    console.log('annoying stask..');
    for await (const sub of Subscriber.find()) {
      await annoy(slimbot, sub);
    }
  },
  {
    timezone: 'Europe/Kiev',
  }
);
