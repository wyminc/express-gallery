const express = require('express');
const app = express();
const methodOverride = require("method-override")
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const galleryRoute = require('./routes/gallery.js');
const authRoutes = require('./routes/auth.js');

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  store: new RedisStore(),
  secret: 'p1',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');
console.log('   connected engine/set');

// app.get("/", (req, res) => {
  //   console.log('start server.js');
  //   res.json("Hi");
  // })
  
app.use('/', galleryRoute)
app.use('/', authRoutes);

app.get('*', (req, res) => {
  res.json('404 error');
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

