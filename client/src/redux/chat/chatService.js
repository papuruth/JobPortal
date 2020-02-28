import axios from 'axios';
import config from '../../config';

async function saveMessage(message) {
  try {
    const response = await axios.post(`${config.nodeBaseUrl}/messages`, {
      message
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
        receiver
      }
    });
    console.log(response.data);
    return response.data ? response.data : [];
  } catch (error) {
    return error;
  }
}

const chatService = {
  saveMessage,
  getMessages
};

export default chatService;
