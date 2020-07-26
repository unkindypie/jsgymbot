const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Subscriber',
  },
  text: String,
  timestamp: Number,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
