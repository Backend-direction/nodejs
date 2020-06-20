const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect('mongodb+srv://vpanki:@lkon018@cluster0-5vfuu.mongodb.net/Project0?retryWrites=true&w=majority')
.then((client) => {
  console.log('connected');
  _db = client.db();
  cb();
})
.catch(err => {
  console.log(err);
  throw err;
});
}

const getDb = () => {
  if(_db) {
    return _db;
  }

  throw 'no database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;