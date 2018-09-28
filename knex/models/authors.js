const bookshelf = require('./bookshelf')

const Tasks = bookshelf.Model.extend({
  tableName: 'authors',
  idAttribute: 'authors_id',
  hasTimestamps: true
})

module.exports = Authors