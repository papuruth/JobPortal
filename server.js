import {} from 'dotenv/config';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import socketConfig from './config/socket';
import DbConnection from './db'; // loads our connection to the mongo database
import route from './expressRoutes/routes';
import nodeMailerConfig from './config/nodeMailer';
// import passport from './passport';

class Server {
  static startApp() {
    // ===== Init MongoStore with express-session
    const MongoStore = connectMongo(session);
    // ===== setup server
    const app = express();
    const server = http.createServer(app);
    // ===== Init SocketIo
    socketConfig(server);
    // ===== Init NodeMailer
    nodeMailerConfig();
    // ===== Middleware ====
    app.use(morgan('dev'));
    app.set('env', process.env.NODE_ENV || 'production');
    app.use(cors());
    app.enable('trust proxy');
    app.use(express.static(path.resolve('client', 'build')));

    app.use(express.static(path.resolve('client', 'src', 'images')));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(
      session({
        secret: process.env.APP_SECRET || 'this is the default passphrase',
        store: new MongoStore({ mongooseConnection: DbConnection() }),
        resave: false,
        saveUninitialized: false
      })
    );

    // ===== Passport ====
    app.use(passport.initialize());
    app.use(passport.session()); // will call the deserializeUser

    // ===== Express App Routing ====
    app.use('/', route);

    if (process.env.NODE_ENV === 'development') {
      app.get('/', (req, res) => {
        if (req.url === '/') {
          res.redirect('http://localhost:3000');
        } else {
          app.use('/', route);
        }
      });
    }
console.log(path.resolve('client', 'build'))
    // ===== Handling production mode:
    if (process.env.NODE_ENV === 'production') {
      console.log('YOU ARE IN THE PRODUCTION ENV');
      app.get('/', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'));
      });
    }

    // ===== Start app
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      console.log('Server is running on Port: ', port);
    });
  }
}

Server.startApp();
