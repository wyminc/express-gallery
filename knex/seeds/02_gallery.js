
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        {
          author_id: 10,
          link: "http://www.fantasticnorway.no/wp-content/uploads/2011/10/Vardhaugen10.jpg",
          description: "Vardhaugen"
        }, {
          author_id: 3,
          link: "http://www.fantasticnorway.no/wp-content/uploads/2013/01/Harris.jpg",
          description: "Harris"
        }, {
          author_id: 8,
          link: "http://www.beta-architecture.com/wp-content/uploads/2011/11/0231_01.jpg",
          description: "Mountain Hill Cabin"
        }, {
          author_id: 2,
          link: "http://www.beta-architecture.com/wp-content/uploads/2011/11/0231_02.jpg",
          description: "Bourgueil & Rouleau"
        }, {
          author_id: 8,
          link: "http://www.fantasticnorway.no/wp-content/uploads/2011/10/Triangel.jpg",
          description: "Triangle Cabin"
        }, {
          author_id: 8,
          link: "http://www.fantasticnorway.no/wp-content/uploads/2011/10/Sirene@21.jpg",
          description: "Sirene"
        }, {
          author_id: 6,
          link: "http://www.fantasticnorway.no/wp-content/uploads/2011/10/Arktiekton21.jpg",
          description: "Arktiekton"
        }, {
          author_id: 10,
          link: "https://i.pinimg.com/originals/cd/72/de/cd72de71dccb17fa1053bfc55d5a834d.jpg",
          description: "On a Thin Line"
        }, {
          author_id: 5,
          link: "https://i.pinimg.com/originals/d4/d7/14/d4d714b1f15bf0924be6d148cedc9044.jpg",
          description: "Sirene at Night"
        }, {
          author_id: 8,
          link: "http://www.fantasticnorway.no/wp-content/uploads/2011/10/Kneisen.jpg",
          description: "Kneisen"
        }
      ]);
    });
};
