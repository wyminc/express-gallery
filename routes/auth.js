const Router = require('express').Router();
const Users = require('../knex/models/users.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, {
    id: user.user_id,
    email: user.email,
    password: user.password,
    eat: 'bubblegum'
  })
})

passport.deserializeUser((user, done) => {
  Users
    .where({ email: user.email })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user)
    })
    .catch(err => {
      console.log('err', err)
      done(err)
    })
})

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  Users
    .where({ email })
    .fetch()
    .then(user => {
      if (user === null) {
        return done(null, false, { message: 'Incorrect email or password' })
      }
      else {
        user = user.toJSON();
        bcrypt.compare(password, user.password)
          .then(result => {
            if (result) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Incorrect email or password' })
            }
          })
          .catch(err => {
            console.log('error', err)
            done(null, false)
          })
      }
    })
    .catch(err => {
      console.log('error', err)
      done(err)
    })
}))


//RENDER FORM
Router.get('/auth/register', (req, res) => {
  res.render('register')
})

Router.get('/auth/login', (req, res) => {
  res.render('login')
})


//REGISTER
const SALT_ROUND = 12

Router.post('/auth/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.genSalt(12)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      return Users
        .forge({ email, password: hash })
        .save()
    })
    .then(user => {
      if (user) {
        res.redirect('/gallery')
      }
      else {
        res.redirect('/auth/register')
      }
    })
    .catch(err => {
      console.log('err', err)
      res.send(err)
    })
})


//LOGIN
Router.post('/auth/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
  delete req.session.returnTo;
})

//LOGOUT
Router.get('/auth/logout', (req, res) => {
  req.logout()
  if (req.session.returnTo === false) {
    res.redirect('/')
  } else {
    res.redirect(req.session.returnTo || '/');
  }
})


Router.get('/auth/protected', isAuthenticated, (req, res) => {
  res.redirect('/gallery', { user: req.user })
})


function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done()
  } else {
    res.redirect('/')
  }
}

module.exports = Router;