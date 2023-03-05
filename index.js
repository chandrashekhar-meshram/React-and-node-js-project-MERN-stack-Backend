const express = require('express');

const app = express();

app.get('/', (req, resp) => {
  resp.send("get Api is working...")
})

app.listen(5000);

//console.log("hi")