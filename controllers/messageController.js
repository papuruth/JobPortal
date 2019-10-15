const Message = require("../models/chats");

exports.saveMessage = async (req) => {
  const {
    sender, receiver, message, date,
  } = req.body;
  const msgObj = { [sender]: message, date };
  const chatData = new Message({
    sender,
    receiver,
    messages: [msgObj],
  });

  const checkClients = await Message.findOne({ $and: [{ sender }, { receiver }] });
  if (checkClients === null) {
    chatData.save();
  } else {
    const msg = { [sender]: message, date };
    Message.findOneAndUpdate({ sender }, { $push: { messages: msg } });
  }
};

exports.getMessages = (req, res) => {
  Message.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
};
