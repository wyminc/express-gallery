const express = require('express');
const Router = express.Router();
const knex = require('../knex/knex.js');

const authors = require('../knex/models/authors.js');
const gallery = require('../knex/models/gallery.js');

//RENDER ALL
Router.get('/', (req, res) => {
  gallery
    .fetchAll()
    .then(gallery => {
      const items = gallery.toJSON()
      res.render("gallery", { items })
    })
    .catch(err => {
      res.json(err);
    })
});

//RENDER FORM 
Router.get('/gallery/new', (req, res) => {
  res.render('gallery-form');
});

Router.get('/gallery/:id/edit', (req, res) => {
  const { id: idString } = req.params;
  const id = parseInt(idString);
  gallery
    .where({ id })
    .fetch()
    .then(image => {
      const itemToEdit = image.attributes;
      res.render("edit", { itemToEdit });
    })
    .catch(err => {
      res.json('error', err)
    })
});

//RENDER DETAIL 
Router.get('/gallery/:id', (req, res) => {
  const { id: idString } = req.params;
  const id = parseInt(idString);
  gallery
    .forge()
    .where({ id })
    .fetch({ withRelated: ["author_id"] })
    .then(results => {
      const authorName = results.relations.author_id.attributes.author_name;
      const gallery = results.attributes;
      gallery.authorName = authorName;
      res.render('gallery-detail', gallery);
    })
    .catch(err => {
      res.json('error', err);
    });
});

//ADD 
Router.post('/gallery/new', (req, res) => {
  const gallery = req.body;
  const payload = {
    author_id: req.body.author_id,
    link: req.body.link,
    description: req.body.description}
  gallery
    .forge(payload)
    .save()
    .then( result => {
      console.log('>>>result =', result);
    })
  // knex.raw(`INSERT INTO gallery (author_id, link, description) VALUES ('${gallery.author_id}', '${gallery.link}', '${gallery.description}')`)
  //   .then(results => {
  //     res.redirect('/');
  //   })
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