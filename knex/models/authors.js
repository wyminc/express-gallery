const bookshelf = require('./bookshelf')

const authors = bookshelf.Model.extend({
  tableName: 'authors',
  idAttribute: 'id',
  hasTimestamps: true
})

module.exports = authors