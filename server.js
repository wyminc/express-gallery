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

app.use(session({
  store: new RedisStore({url: 'redis://redis:6379', logErrors: true}),
  secret: 'p1',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

// app.get("/", (req, res) => {
  //   console.log('start server.js');
  //   res.json("Hi");
  // })
console.log('   connected engine/set');

app.use('/', galleryRoute)
app.use('/', authRoutes);

app.get('*', (req, res) => {
  res.json('404 error, this is the last item before app.listen on the server.js file');
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

