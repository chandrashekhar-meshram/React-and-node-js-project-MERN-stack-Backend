const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connectDb = async () => {
  mongoose.connect('mongodb+srv://shekharonlineproject:shekharonlineproject@cluster0.8rwhj8f.mongodb.net/e-comm?retryWrites=true&w=majority'
  )
  const productSchema = new mongoose.Schema({});
  const product = mongoose.model('products', productSchema);
  const data = await product.find();
  console.log('data', data);
}

connectDb();

app.get('/', (req, resp) => {
  resp.send("get Api is working...")
})


app.listen(5000);