const bookshelf = require('./bookshelf')

const Gallery = bookshelf.Model.extend({
  tableName: 'gallery',
  idAttribute: 'gallery_id',
  hasTimestamps: true
})

module.exports = Gallery