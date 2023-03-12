const express = require('express');
const mongoose = require('mongoose');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require('cors');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm'; // do not share with any one
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
  resp.send("get Api is working...")
})

app.post('/register', async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  // result = result.toObject();//converting result into object
  // delete result.password;
  result = result.toObject();
  delete result.password
  //resp.send(result);
  
  Jwt.sign({ result}, jwtKey, {expiresIn: "2h"}, (err, token) => {
    if(err) {
      resp.send("Somthing went wrong !");
    }
    resp.send({ result, auth: token })
  })  
});

app.post('/login', async (req, resp) => {
  let err = { result: "No user found" };

  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user},jwtKey, {expiresIn: "2h"}, (err, token)=> {
        if(err) {
          resp.send({ result: "Somthing went wrong !"})
        }
        resp.send({user, auth: token});
      })
      
    } else {
      resp.send(err);
    }
  } else {
    resp.send(err);
  }
});

app.post('/add-product', async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get('/products', async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products)
  } else {
    resp.send({ result: "No Product found" });
  }
});

app.delete('/product/:id', async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get('/product/:id', async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: 'No Record Found' });
  }
});

app.put('/product/:id', async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body } // need to update data
  )
  resp.send(result);
});

app.get('/search/:key', verifyToken, async (req, resp)=> {
  let result = await Product.find({
    "$or": [
      { name: {$regex: req.params.key} },
      { company: {$regex: req.params.key} },
      { category: {$regex: req.params.key } }
    ]
  });
  resp.send(result);
});

function verifyToken(req, resp, next){
  let token = req.headers['authorization'];
  console.log("verifyToken called => ", token);
  next();
}

let count = 5;
console.log(count++);

app.listen(5000);