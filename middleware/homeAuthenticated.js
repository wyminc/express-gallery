
const GalleryDB = require('../knex/models/gallery.js');

module.exports = function isAuthenticated(req, res, next) {
    // will pass on to the next middleware if successfully authenticated
    if (req.isAuthenticated()) { res.redirect('/gallery') }
    // need to redirect to error page or notify user somehow that permission has been denied
    else {      GalleryDB
        .fetchAll()
        .then(myGallery => {
          let galleryItem = myGallery.serialize()
          // console.log('homeGallery: ', galleryItem);
          res.render('home.hbs', { galleryItem });
        })
        .catch(err => {
          res.json(err);
        })   }
  };