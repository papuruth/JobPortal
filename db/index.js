/* Mongo Database
 * - this is where we set up our connection to the mongo database
 */
import mongoose from 'mongoose';

const DbConnection = () => {
  mongoose.Promise = global.Promise;
  let MONGO_URL;
  const MONGO_LOCAL_URL = 'mongodb://localhost:27017/JobPortal';
  if (process.env.MongoDbURI) {
    mongoose.connect(process.env.MongoDbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    MONGO_URL = process.env.MongoDbURI;
  } else {
    mongoose.connect(MONGO_LOCAL_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    MONGO_URL = MONGO_LOCAL_URL;
  }

  // should mongoose.connection be put in the call back of mongoose.connect???
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.log(`There was an error connecting to the database: ${err}`);
  });
  db.once('open', () => {
    console.log(
      `You have successfully connected to your mongo database: ${MONGO_URL}`
    );
  });
  return db;
};
export default DbConnection;
