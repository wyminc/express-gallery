const bookshelf = require('./bookshelf')

const Authors = bookshelf.Model.extend({
  tableName: 'authors',
  idAttribute: 'authors_id',
  hasTimestamps: true
})

module.exports = Authors