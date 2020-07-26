const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
  name: String,
  username: String,
  chatId: Number,
  telgeramId: Number,
  currentProgress: Number,
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
