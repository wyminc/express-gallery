const bookshelf = require('./bookshelf');

const registrar = bookshelf.Model.extend({
  tableName: 'user',
  idAttribute: 'user_id',
  hasTimestamps: true 
})

// class Users extends bookshelf.Model {
//   get tableName() {return 'user'}
//   get idAttribute() {return 'user_id'}
//   get hasTimestamps() {return true}
// }

module.exports = registrar;