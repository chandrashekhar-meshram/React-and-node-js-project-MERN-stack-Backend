const express = require('express');
const mongoose = require('mongoose');
require('./db/config');
const User = require('./db/User');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/register', async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
})
let count = 2;
console.log(count++);

app.listen(5001);