const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const galleryRoute = require('./routes/gallery.js');

app.get("/", (req, res) => {
  res.json("Hi");
})

app.use('/gallery', galleryRoute)

app.get('*', (req, res) => {
  res.json('404 error');
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

