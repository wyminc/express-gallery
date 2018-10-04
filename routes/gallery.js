const express = require('express');
const Router = express.Router();
const knex = require('../knex/knex.js');

const authors = require('../knex/models/authors.js');
const gallery = require('../knex/models/gallery.js');

//Random # Generator
let random = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

//Finding index of an object inside an array of objects
let index = (arr, obj) => {
  return arr.map(element => {
    return element.id
  }).indexOf(obj.id)
}

//True/False using the index function made above
let found = (arr, obj) => {
  if (index(arr, obj) === -1) {
    return false;
  } else {
    return true;
  }
}

//RENDER HOME PAGE
Router.get("/", (req, res) => {
  gallery
    .fetchAll()
    .then(results => {
      const imageArr = results.toJSON();
      const arrLength = imageArr.length;
      const number = random(imageArr);
      const randomImage = imageArr[number];
      if (number < (arrLength - 1)) {
        const imageObj = { frontPage: randomImage };
        imageObj.links = imageArr;
        imageObj.counter = { length: arrLength, showId: `0${randomImage.id}` };
        res.render("gallery", imageObj);
      } else {
        const imageObj = { frontPage: randomImage };
        imageObj.links = imageArr;
        imageObj.counter = { length: arrLength, showId: `${randomImage.id}` };
        res.render("gallery", imageObj);
      }
    })
})

//RENDER ALL
Router.get('/gallery', (req, res) => {
  gallery
    .fetchAll()
    .then(gallery => {
      const items = gallery.toJSON()
      res.render("gallery-all", { items })
    })
    .catch(err => {
      res.json(err);
    })
});

//RENDER SEARCH RESULTS PAGE
Router.post("/search", (req, res) => {
  const info = req.body;
  const name = (info.name).toLowerCase();
  gallery
    .query(function (qb) {
      qb.whereRaw(`LOWER(description) LIKE ?`, [`%${name}%`])
    })
    .fetchAll()
    .then(results => {
      if ((results.toJSON()).length) {
        const items = results.toJSON();
        res.render("gallery-all", { items })
      } else if (results.toJSON().length == 0) {
        res.render("gallery-all");
      } else {
        let items = [];
        items.push(results.toJSON());
        res.render("gallery-all", { items });
      }
    })
    .catch(err => {
      res.json(err);
    })
})

//RENDER ABOUT PAGE
Router.get("/about", (req, res) => {
  res.render("about");
})

//RENDER FORM 
Router.get('/gallery/new', (req, res) => {
  res.render('gallery-form');
});

Router.get('/gallery/:id/edit', (req, res) => {
  const { id: idString } = req.params;
  const id = parseInt(idString);
  gallery
    .where({ id })
    .fetch({ withRelated: ["author_id"] })
    .then(results => {
      const authorName = results.relations.author_id.attributes.author_name;
      const itemToEdit = results.attributes;
      itemToEdit.authorName = authorName;
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
    .where({ id })
    .fetch({ withRelated: ["author_id"] })
    .then(results => {
      const authorName = results.relations.author_id.attributes.author_name;
      const gallery = results.attributes;
      gallery.authorName = authorName;
      return gallery;
    })
    .then(results => {
      let imgObj = {};
      imgObj.detailed = results;
      gallery
        .fetchAll()
        .then(results => {
          imgObj.sideGallery = results.toJSON();
          if (found(imgObj.sideGallery, imgObj.detailed)) {
            (imgObj.sideGallery).splice(index(imgObj.sideGallery, imgObj.detailed), 1);
            res.render('gallery-detail', imgObj);
          } else {
            res.render('gallery-detail', imgObj);
          }
        })
    })
    .catch(err => {
      res.json('error', err);
    });
});

//ADD 
Router.post('/gallery/new', (req, res) => {
  const info = req.body;
  const authorInfo = {
    author_name: info.author_name
  };
  authors
    .forge(authorInfo)
    .save()
    .then(results => {
      const authorResults = results.attributes;
      const galleryInfo = {
        author_id: authorResults.id,
        link: info.link,
        description: info.description
      };
      gallery
        .forge(galleryInfo)
        .save()
        .then(results => {
          const galleryResults = results.attributes;
          res.redirect(`/gallery/${galleryResults.id}`);
        })
    })
    .catch(err => {
      res.json('error', err);
    });
});

//REMOVE  
Router.delete('/gallery/:id', (req, res) => {
  let { id } = req.params;
  gallery
    .where({ id })
    .destroy()
    .then(results => {
      res.redirect("/");
    })
    .catch(err => {
      res.json(err);
    })
});

//EDIT  
Router.put('/gallery/:id', (req, res) => {
  let { id } = req.params;
  const info = req.body;
  const galleryInfo = {
    link: info.link,
    description: info.description
  };
  gallery
    .where({ id })
    .fetch()
    .then(results => {
      return results.save(galleryInfo);
    })
    .then(results => {
      const authorInfo = {
        author_name: info.author_name
      };
      id = results.attributes.author_id;
      authors
        .where({ id })
        .fetch()
        .then(results => {
          return results.save(authorInfo);
        })
        .then(results => {
          const { id: number } = req.params;
          res.redirect(`/gallery/${number}`);
        })
    })
    .catch(err => {
      res.json('error', err)
    });
});

module.exports = Router;