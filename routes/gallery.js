const express = require('express');
const Router = espress.Router();
const knex = require('../knex/knex.js');

//RENDER ALL
Router.get('/', (req, res) => {
  knex.raw(`SELECT * FROM gallery`)
    .then( result => {
      const gallery = result.rows
      res.render('gallery', { gallery });
    })
    .catch( err => {
      console.log('error', err);
    });
});

//RENDER FORM 
Router.get('/new', (req, res) => {
    res.render('gallery-form');
});

Router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  knex.raw(`SELECT * FROM gallery WHERE id = ${id}`)
    .then( result => {
      const pictureToEdit = result.rows[0]
      res.render('edit', { pictureToEdit });
    })
    .catch( err => {
      console.log('error', err)
    })
});

//RENDER DETAIL 
Router.get('/:id', (req, res) => {
  const { id } = req.params;
  knex.raw(`SELECT * FROM gallery WHERE id = ${id}`)
    .then( result => {
      const gallery = result.rows[0]
      res.render('gallery-detail', gallery);
    })
    .catch( err => {
      console.log('error', err);
    });
});

//ADD 
Router.post('/new', (req, res) => {
  const gallery = req.body;
  knex.raw(`INSERT INTO gallery (author_id, link, description) VALUES ('${gallery.author_id}', '${gallery.link}', '${gallery.description}')`)
    .then( results =>  {
      res.redirect('/');
    })
    .catch( err => {
      console.log('error', err)
      res.redirect('/');
    });
});

//REMOVE  
Router.delete('/:id', (req, res) => {
  const { id } = req.params;
  knex.raw(`DELETE FROM gallery WHERE id = ${id}`)
    .then( result => {
      res.redirect('/');
    })
    .catch( err => {
      console.log('error', err);
    });
});

//EDIT  
Router.put('/:id', (req, res) => {
  const { id } = req.params;
  const gallery = req.body;
  knex.raw(`UPDATE gallery SET author_id = '${gallery.author_id}', link = ${gallery.link}, description = ${gallery.description} WHERE id = ${id}`)
  .then( result => {
      res.redirect(`/${id}`);
    })
    .catch( err => {
      console.log('error', err)
    });
});

module.exports = Router;