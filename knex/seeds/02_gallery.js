
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        {
          author_id: 10,
          link: "https://robohash.org/atqueconsequaturmollitia.png?size=50x50&set=set1",
          description: "Operative didactic alliance"
        }, {
          author_id: 3,
          link: "https://robohash.org/quasetqui.jpg?size=50x50&set=set1",
          description: "Enhanced web-enabled contingency"
        }, {
          author_id: 8,
          link: "https://robohash.org/utdelectustemporibus.bmp?size=50x50&set=set1",
          description: "Function-based solution-oriented interface"
        }, {
          author_id: 2,
          link: "https://robohash.org/omnisnobisperferendis.jpg?size=50x50&set=set1",
          description: "Mandatory leading edge knowledge base"
        }, {
          author_id: 8,
          link: "https://robohash.org/ullamharumneque.bmp?size=50x50&set=set1",
          description: "Persevering optimizing protocol"
        }, {
          author_id: 8,
          link: "https://robohash.org/ducimusaliquiddolorem.bmp?size=50x50&set=set1",
          description: "Cross-group fresh-thinking policy"
        }, {
          author_id: 6,
          link: "https://robohash.org/etquivoluptatem.jpg?size=50x50&set=set1",
          description: "Sharable human-resource solution"
        }, {
          author_id: 10,
          link: "https://robohash.org/utautemvoluptates.png?size=50x50&set=set1",
          description: "Phased object-oriented methodology"
        }, {
          author_id: 5,
          link: "https://robohash.org/numquamoditrepellendus.jpg?size=50x50&set=set1",
          description: "Proactive zero defect ability"
        }, {
          author_id: 8,
          link: "https://robohash.org/fugitutnemo.jpg?size=50x50&set=set1",
          description: "Upgradable next generation knowledge user"
        }
      ]);
    });
};
