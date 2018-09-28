const express = require('express');
const Router = express.Router();
const knex = require('../knex/knex.js');

const authors = require('../knex/models/authors');
const gallery = require('../knex/models/gallery');

//RENDER ALL
Router.get('/', (req, res) => {
  gallery
  .fetchAll()
  .then( gallery => {
    const items = gallery.serialize()
    console.log(items);
    res.render("gallery", { items })
  })
  .catch( err => {
    res.json(err);
  })
  // knex.raw(`SELECT * FROM gallery`)
  //   .then(result => {
  //     const gallery = result.rows
  //     res.render('gallery', { gallery });
  //   })
  //   .catch(err => {
  //     console.log('error', err);
  //   });
});

//RENDER FORM 
Router.get('/gallery/new', (req, res) => {
  res.render('gallery-form');
});

Router.get('/gallery/:id/edit', (req, res) => {
  const { id } = req.params;
  knex.raw(`SELECT * FROM gallery WHERE id = ${id}`)
    .then(result => {
      const itemToEdit = result.rows[0]
      res.render('edit', { itemToEdit });
    })
    .catch(err => {
      console.log('error', err)
    })
});

//RENDER DETAIL 
Router.get('/gallery/:id', (req, res) => {
  console.log('start render detail')
  const { id } = req.params;
  knex.raw(`SELECT * FROM gallery WHERE id = ${id}`)
    .then(result => {
      const gallery = result.rows[0]
      res.render('gallery-detail', gallery);
    })
    .catch(err => {
      console.log('error', err);
    });
});

//ADD 
Router.post('/gallery/new', (req, res) => {
  const gallery = req.body;
  knex.raw(`INSERT INTO gallery (author_id, link, description) VALUES ('${gallery.author_id}', '${gallery.link}', '${gallery.description}')`)
    .then(results => {
      res.redirect('/');
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/');
    });
});

//REMOVE  
Router.delete('/gallery/:id', (req, res) => {
  const { id } = req.params;
  knex.raw(`DELETE FROM gallery WHERE id = ${id}`)
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log('error', err);
    });
});

//EDIT  
Router.put('/gallery/:id', (req, res) => {
  const { id } = req.params;
  const gallery = req.body;
  knex.raw(`UPDATE gallery SET author_id = '${gallery.author_id}', link = ${gallery.link}, description = ${gallery.description} WHERE id = ${id}`)
    .then(result => {
      res.redirect(`/${id}`);
    })
    .catch(err => {
      console.log('error', err)
    });
});

module.exports = Router;