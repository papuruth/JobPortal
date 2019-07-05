const Message = require('../models/chats');

exports.saveMessage = async (req, res) => {
    const { sender, receiver, message, date } = req.body;
    console.log(req.body)
    const msgObj = { [sender]: message, 'date': date }
    const chatData = new Message({
        'sender': sender,
        'receiver': receiver,
        'messages': [msgObj]
    });

    console.log(chatData.message);
    const checkClients = await Message.findOne({ $and: [{ 'sender': sender }, { 'receiver': receiver }] });
    if (checkClients === null) {
        chatData.save()
            .then((result) => {
                console.log('Message saved successfully')
            }).catch((err) => {
                console.log(err.message)
            });
    } else {
        console.log('Data already exists pushing messages')
        const msg = { [sender]: message, 'date': date };
        console.log(msg)
        Message.findOneAndUpdate({ 'sender': sender }, { $push: { 'messages': msg } })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }
}

exports.getMessages = (req, res) => {
    const messages = Message.find({})
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.log(err.message);
    })
}