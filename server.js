const express = require('express');
const app = express();
const methodOverride = require("method-override")
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const galleryRoute = require('./routes/gallery.js');

app.use(express.static("public"));

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

console.log('   connected engine/set');

app.use('/', galleryRoute)

app.get('*', (req, res) => {
  res.json('404 error');
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

