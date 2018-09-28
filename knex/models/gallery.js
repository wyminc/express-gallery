const bookshelf = require('./bookshelf');
const authors = require("./authors");

const gallery = bookshelf.Model.extend({
  tableName: 'gallery',
  author_id: function () {
    return this.belongsTo(authors, 'author_id');
  },
  idAttribute: 'id',
  hasTimestamps: true
})

module.exports = gallery