const bookshelf = require('./bookshelf');

const users = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'user_id',
  hasTimestamps: true
})


module.exports = users;