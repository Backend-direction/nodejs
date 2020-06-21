const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Product', productSchema);
// const mongoDb = require('mongodb');
// const getBd = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongoDb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getBd();
//     let dbOp;

//     if(this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this })
//     } else {
//       // create new product
//       dbOp = db
//       .collection('products')
//       .insertOne(this)
//     }

//   return dbOp
//     .then(result => {
//       console.log(result);
//     })
//     .catch(console.log)
//   }

//   static fetchAll() {
//     const db = getBd();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(console.log)
//   }

//   static findById(prodId) {
//     const db = getBd();
//     console.log('prodId', prodId)
//     return db
//       .collection('products')
//       .find({_id: mongoDb.ObjectId(prodId)})
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(console.log)
//   }
  
//   static deleteById(prodId) {
//     const db = getBd();

//     return db
//       .collection('products')
//       .deleteOne({ _id: mongoDb.ObjectId(prodId) })
//       .then(res => console.log('Deleted'))
//       .catch(console.log)
//   }

// }

// module.exports = Product;