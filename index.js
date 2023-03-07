const express = require('express');
const mongoose = require('mongoose');
require('./db/config');
const User = require('./db/User');
const app = express();

// const connectDb = async () => {
 
//   const productSchema = new mongoose.Schema({});
//   const product = mongoose.model('products', productSchema);
//   const data = await product.find();
//   console.log('data', data);
// }

// connectDb();

app.get('/', (req, resp) => {
  resp.send("get Api is working...")
})

app.post('/register', (req, resp)=> {
  resp.send('register api working...');
})

app.listen(5001);