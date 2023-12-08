import { injectable } from "inversify";
const mongoose = require('mongoose');
const urlDb = 'mongodb://root:example@mongo:27017/';

@injectable()
export class DbConnection {
  async connection() {
    try {
      await mongoose.connect(urlDb, {
        dbName: 'books',
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('mongodb connected');
    } catch (e) {
      console.log(e);
    }
  }
}
