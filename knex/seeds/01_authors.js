
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {author_name: 'Suzanne Collins'},
        {author_name: 'J.K. Rowlings'},
        {author_name: 'Ass McGee'},
        {author_name: 'Tony Tiger'},
        {author_name: 'Winnie Pooh'},
        {author_name: 'Buzz Lightyear'},
        {author_name: 'Karl Marx'},
        {author_name: 'Windy Wendy'},
        {author_name: 'Cpt America'},
        {author_name: 'Thor Odinson'},
      ]);
    });
};
