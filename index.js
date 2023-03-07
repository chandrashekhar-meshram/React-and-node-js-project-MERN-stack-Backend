const express = require('express');
const mongoose = require('mongoose');
require('./db/config');
const User = require('./db/User');
const app = express();
app.use(express.json());

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

app.post('/register', (req, resp) => {
  resp.send(req.body);
})

console.log("hi");

app.listen(5000);