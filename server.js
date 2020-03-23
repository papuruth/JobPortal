const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const http = require('http');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const axios = require('axios');
const moment = require('moment');

const port = 3001;
// setup server
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
const passport = require('./passport');
const dbConnection = require('./db'); // loads our connection to the mongo database
const route = require('./expressRoutes/routes');
const config = require('./config');

// ===== Middleware ====
app.use(morgan('dev'));
app.set('env', process.env.NODE_ENV || 'production');
app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(express.static(path.join(__dirname, 'client/src/images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ===== Express App Routing ====
app.use('/', route);

// Right before your app.listen(), add this:
if (process.env.NODE_ENV === 'production') {
  console.log('YOU ARE IN THE PRODUCTION ENV');
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(process.env.PORT || port, () => {
  console.log('Server is running on Port: ', process.env.PORT || port);
});
let clients = [];
// Setup socket.io
socketIo.on('connection', async (socket) => {
  const { username } = socket.handshake.query;
  console.log(`${username} connected`);
  if (username) {
    await axios
      .post(`${config.nodeBaseUrl}/online-users`, {
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
        .post(`${config.nodeBaseUrl}/online-users`, {
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

// Setting up NodeMailer

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

exports.transporter = transporter;
