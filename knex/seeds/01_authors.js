
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        { author_name: 'Tore Dahlström' },
        { author_name: 'Ulla Strömberg' },
        { author_name: 'Håkan Jacobsson' },
        { author_name: 'Anne Gunnarsson' },
        { author_name: 'Ernst Stenmark' },
        { author_name: 'Anja Mattson' },
        { author_name: 'Katri Syrén' },
        { author_name: 'Öne Nilsson' },
        { author_name: 'Emely Mörner' },
        { author_name: 'Vilhelmina Östlund' },
      ]);
    });
};
