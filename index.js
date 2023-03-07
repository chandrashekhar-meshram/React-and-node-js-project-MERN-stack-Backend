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
});

app.post('/login', async (req, resp) => {
  let err = { result: "No user found" };
  
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send(err);
    }
  } else {
    resp.send(err);
  }
});

let count = 5;
console.log(count++);

app.listen(5000);