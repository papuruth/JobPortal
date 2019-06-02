import axios from 'axios'

export const chatService = {
  saveMessage,
  getMessages
};

async function saveMessage(sender, receiver, message, date) {
  return await axios.post('http://localhost:4000/messages', { sender, receiver, message, date })
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      return error
    })
}

async function getMessages(sender, receiver) {
  return await axios.get('http://localhost:4000/chats', {
    params: {
      sender, receiver
    }
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error
    })
}