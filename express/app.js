const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('in middleware')
  next();
});

app.use((req, res, next) => {
  console.log('in another')
  res.send('<h1>Hello form express</h1>')
});

app.listen(3000);