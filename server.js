const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.EXPRESS_CONTAINER_PORT;

app.get("/", (req, res) => {
  res.json("Hi");
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

