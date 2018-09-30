
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {email: 'wymin@email.com', password: 'p1'},
        {email: 'jeff@email.com',password: 'p2'},
      ]);
    })
};


