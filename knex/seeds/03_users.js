
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'wymin@email.com',
          password: '$2a$12$lMsB2fJiRq4/pBqgGydCbeO7343wPqP2FXwZEgcxfLRiUd8UeDmpC'
        },
        {
          email: 'jeff@email.com',
          password: '$2a$12$fPfSwVVf7sYqRVblSYbBu.yh1CgYwcCIW7vMieSvi0nuyyJNailIG'
        },
      ]);
    });
};



