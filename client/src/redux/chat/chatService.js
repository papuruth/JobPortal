import axios from 'axios';
import config from '../../config';

async function saveMessage(sender, receiver, message, date) {
  try {
    const response = await axios.post(`${config.nodeBaseUrl}/messages`, {
      sender, receiver, message, date,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getMessages(sender, receiver) {
  try {
    const response = await axios.get(`${config.nodeBaseUrl}/chats`, {
      params: {
        sender,
        receiver,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

const chatService = {
  saveMessage,
  getMessages,
};

export default chatService;
