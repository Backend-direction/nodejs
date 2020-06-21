const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5eef7af158c6d143cc71acc7')
  .then(user => {
    req.user = user;
    next();
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://vpanki:Pavlovska1991@cluster0-5vfuu.mongodb.net/Project0?retryWrites=true&w=majority')
.then(res => {
  User.findOne()
  .then( user => {
      if (!user) {
        const user = new User({
          name: 'Vova',
          email: 'vova@gmail.com',
          cart: []
        });
        
        user.save();
      }
  })

  app.listen(3000)
})
.catch(err => console.log('start server', err))
