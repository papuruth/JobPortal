const Message = require('../models/chats');

exports.saveMessage = async (req) => {
  const { message } = req.body;
  const { sender, receiver } = message;
  const chatData = new Message({
    sender,
    receiver,
    messages: [message]
  });

  const checkClients = await Message.findOne({
    $and: [{ sender }, { receiver }]
  });
  if (checkClients === null) {
    chatData.save();
  } else {
    await Message.findOneAndUpdate(
      { $and: [{ sender }, { receiver }] },
      { $push: { messages: message } }
    );
  }
};

exports.getMessages = (req, res) => {
  Message.find()
    .or([
      { $and: [{ sender: req.query.sender }, { receiver: req.query.receiver }] },
      { $and: [{ sender: req.query.receiver }, { receiver: req.query.sender }] }
    ])
    .exec((err, data) => {
      if (err) {
        return err;
      }
      return res.json(data);
    });
};
