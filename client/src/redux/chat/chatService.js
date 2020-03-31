import axios from 'axios';
import config from '../../config';

async function saveMessage(message) {
  try {
    const response = await axios.post(`${config.nodeBaseUrl}/api/v1/messages`, {
      message
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getMessages(sender, receiver) {
  try {
    const response = await axios.get(`${config.nodeBaseUrl}/api/v1/chats`, {
      params: {
        sender,
        receiver
      }
    });
    return response.data ? response.data : [];
  } catch (error) {
    return error;
  }
}

async function getOnlineUser(username) {
  try {
    const response = await axios.get(`${config.nodeBaseUrl}/api/v1/onlineusers`, {
      params: {
        username
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

const chatService = {
  saveMessage,
  getMessages,
  getOnlineUser
};

export default chatService;
