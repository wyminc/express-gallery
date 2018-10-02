const router = require('express').Router();
const Users = require('../knex/models/users.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

passport.serializeUser( (user, done) => {
  console.log('>>> serializeUser =', user)
  done(null, {
    email: user.email,
    password: user.password
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
    })
    .catch( err => {
      console.log('err', err)
    })
})

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  console.log('>>> local is being called')
  Users
    .where({email})
    .fetch()
    .then( user => {
      console.log('>>> user in local strategy =', user)
      user = user.toJSON();
      // if (user.password === password) {
      //   done(null, user )
      // } else {
      //   done(null, false)
      // }
      bcrypt.compare(password, user.attributes.password)
        .then( result => {
          if (result) {
            done(null, user.attributes)
          } else {
            done(null, false)
          }
        })
        .catch( err => {
          done(err)
        })
    })
    .catch( err => {
      // done(null, false)
      done(err)
    })
}))


const SALT_ROUND = 12

router.post('/auth/register', (req, res) => {

  const { email, password } = req.body;
  Users 
    .forge({email, password})
    .save()
    .then( result => {
      if (result) {
        res.send('NEW USAR MADE!!!!!')
      }
      else {
        res.send('SOME ERRAR MAKING USAR!!!')
      }
    })
    .catch( err => {
      console.log('error', err)
      res.send(err)
    })
})

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  Users
    .where({ email })
    .fetch()
    .then( user => {
      if (password === user.attributes.password) {
        req.session.isLoggedIn = true
        res.send('JOO R AUTHENTICATEDZ!!!!')
      }
      else {
        res.send('ZOMG WRONG USARNAME OR PASSWORD!!!!')
      }
    })
    .catch( err => {
      console.log('err', err)
      res.send(err)
    })

})

router.post('/auth/logout', (req, res) => {
  req.session.destroy()
  res.send('loggedout')
})

router.get('/auth/protected', (req, res) => {
  if (req.session.isLoggedIn) {
    res.send('JOO SHALL PASSS!!!!')
  }
  else {
    res.send('NONNNEEE SHALLL PASSS!!!!')
  }
  // res.send('protected')
})

router.get('/auth/secret',isAuthenticated, (req, res) => { 
  res.send('YOU HAVE FOUND DA SEKRET')
})

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done()
  } else {
    res.redirect('/')
  }
}

module.exports = router;