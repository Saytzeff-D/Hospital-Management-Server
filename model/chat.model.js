const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  text: String,
})

const chatModel = mongoose.model('chat_tbs', chatSchema);

module.exports = chatModel;