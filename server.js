const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const galleryRoute = require('./routes/gallery.js');

app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');
console.log('   connected engine/set');

// app.get("/", (req, res) => {
//   console.log('start server.js');
//   res.json("Hi");
// })

app.use('/', galleryRoute)

app.get('*', (req, res) => {
  res.json('404 error');
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

