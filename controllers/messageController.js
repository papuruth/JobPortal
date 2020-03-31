import  moment from 'moment';
import  Message from '../models/chats';
import OnlineUserSchema from '../models/onlineUsers';

export default class MessageController {
  static saveMessage = async (req) => {
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

  static getMessages = (req, res) => {
    Message.find()
      .or([
        {
          $and: [{ sender: req.query.sender }, { receiver: req.query.receiver }]
        },
        { $and: [{ sender: req.query.receiver }, { receiver: req.query.sender }] }
      ])
      .exec((err, data) => {
        if (err) {
          return err;
        }
        return res.json(data);
      });
  };

  static updateOnlineUser = async (req, res) => {
    const { username, status, disconnectTime } = req.body;
    const onlineUserData = new OnlineUserSchema({
      username,
      status,
      disconnectTime
    });

    const onlineUser = await OnlineUserSchema.findOne({ username });
    if (onlineUser) {
      await OnlineUserSchema.findOneAndUpdate(
        { username },
        { $set: req.body },
        (error, data) => {
          if (error) {
            return error;
          }
          res.status(201).send(data);
        }
      );
    } else {
      await onlineUserData
        .save()
        .then((data) => {
          res.status(201).send(data);
        })
        .catch((error) => {
          return error;
        });
    }
  };

  static getOnlineUsers = async (req, res) => {
    await OnlineUserSchema.find({ username: req.query.username }, (err, data) => {
      if (err) {
        return err;
      }
      res.status(200).send(data);
    });
  };

}
