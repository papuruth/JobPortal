import axios from 'axios'

export const chatService = {
  saveMessage,
  getMessages
};

async function saveMessage(sender, receiver, message, date) {
  return await axios.post('https://jobportalmern.herokuapp.com/messages', { sender, receiver, message, date })
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      return error
    })
}

async function getMessages(sender, receiver) {
  return await axios.get('https://jobportalmern.herokuapp.com/chats', {
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