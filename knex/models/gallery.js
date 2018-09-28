const bookshelf = require('./bookshelf')

const Tasks = bookshelf.Model.extend({
  tableName: 'gallery',
  idAttribute: 'gallery_id',
  hasTimestamps: true
})

module.exports = Gallery