import socketIo from 'socket.io';
import config from './index';
import axios from 'axios';
import moment from 'moment';

const socketConfig = (server) => {
  const socketCon = socketIo(server, { wsEngine: 'ws' });
  let clients = [];
    // Setup socket.io
    socketCon.on('connection', async (socket) => {
      const { username } = socket.handshake.query;
      console.log(`${username} connected`);
      if (username) {
        await axios
          .post(`${config.nodeBaseUrl}/api/v1/online-users`, {
            username,
            status: 'Online',
            disconnectTime: ''
          })
          .then(() => {})
          .catch((error) => {
            console.error(error);
          });
      }
      socket.broadcast.emit('isonline', [username]);
      clients.push({ [username]: socket });
      clients = [...new Set(clients)];
      socket.on('client:message', (data) => {
        console.log('client message', data);
        console.log(`${data.sender}: ${data.message}`);
        // message received from client, now broadcast it to desired user
        clients.forEach((item) => {
          if (data.receiver in item) {
            socket.to(item[data.receiver].id).emit('server:message', data);
          }
        });
      });

      socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { owner: username, isTyping: data });
      });

      socket.on('imonline', (data) => {
        socket.broadcast.emit('imonline', data);
      });

      socket.on('disconnect', async () => {
        clients = clients.filter((soc) => !soc[username]);
        console.log(`${username} disconnected`);
        if (username) {
          await axios
            .post(`${config.nodeBaseUrl}/api/v1/online-users`, {
              username,
              status: 'Offline',
              disconnectTime: moment(new Date(), 'HH:mm')
            })
            .then(() => {})
            .catch((error) => {
              console.error(error);
            });
        }
        socket.broadcast.emit('isoffline', [username]);
      });
    });
}

export default socketConfig;