const Router = require('express').Router();
const Users = require('../knex/models/users.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser( (user, done) => {
  console.log('>>> serializeUser =', user)
  done(null, {
    id: user.user_id,
    email: user.email,
    password: user.password,
    eat: 'bubblegum'
  })
})

passport.deserializeUser( (user, done) => {
  console.log('>>> deserializing User =', user)
  Users
    .where({email: user.email})
    .fetch()
    .then( user => {
      user = user.toJSON();
      done(null, user)
      // const whateverIWant = {
      //   email: user.attributes.email,
      //   id: user.id,
      //   ip: 'mhFake IP here 0.0.0.0'
      // }
      // done(null, whateverIWant)
    })
    .catch( err => {
      console.log('err', err)
      done(err)
    })
})

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  console.log('>>> local is being called')
  Users
    .where({email})
    .fetch()
    .then( user => {
      console.log('>>> user in local strategy =', user)
      if (user === null) {
        return done(null, false, { message: 'Incorrect email or password' })
      }
      else {
        user = user.toJSON();
        bcrypt.compare(password, user.password)
          .then( result => {
            console.log('>>> local strategy password =', password)
            console.log('>>> local strategy user.attributes.password =', user.password)
            console.log('>>> local strategy result =', result)
            if (result) {
              console.log('>>> local strategy result true =', result)
              return done(null, user)
            } else {
              console.log('>>> local strategy else result false =', result)
              return done(null, false, { message: 'Incorrect email or password' })
            }
          })
          .catch( err => {
            console.log('error', err)
            done(null, false)
          })
      }
    })
    .catch( err => {
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
    .then( salt => {
      console.log('>>> salt =', salt)
      return bcrypt.hash(password, salt)
    })
    .then( hash => {
      console.log('>>> hash =', hash)
      return Users 
        .forge({email, password: hash})
        .save()
    })
    .then( user => {
      if (user) {
        res.redirect('/gallery')
      }
      else{
        res.redirect('/auth/register')
      }
    })
    .catch( err => {
      console.log('err', err)
      res.send(err)
    })
})


//LOGIN
Router.post('/auth/login', passport.authenticate('local', {successRedirect: '/gallery', failureRedirect: '/auth/login'}), (req, res) => {
  console.log('>>> this is posting!!!! YAY!!!')
  // res.redirect('/auth/protected')
})

//Router.post('/auth/login/google', passport.authenticate('google'))


//LOGOUT
Router.get('/auth/logout', (req, res) => {
  req.logout()
  console.log('logged out ready to redirect to /')
  res.redirect('/')
  console.log('redirecting to / because logged out')
})


Router.get('/auth/protected', isAuthenticated, (req, res) => {
  res.redirect('/gallery', { user: req.user } )
  // if (req.isAuthenticated()) {
  //   console.log('>>> REQ.USER', req.user)
  //   res.send('JOO SHALL PASS!!!')
  // }
  // else {
  //   res.send('NONE SHALL PASSSSS!!!!!')
  // }
})

Router.get('/auth/secret',isAuthenticated, (req, res) => { 
  res.send('>>> YOU HAVE FOUND DA SEKRET')
})

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done()
  } else {
    res.redirect('/')
  }
}

module.exports = Router;