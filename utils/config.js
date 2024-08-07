module.exports = {
  dev: {
    databaseurl:
      "mongodb+srv://excellence-oyeniran:excelly2000@test-cluster.4ekj5.mongodb.net/trollbasket",
    // `mongodb+srv://oyeniranexcellenced:${process.env.DATABASE_PASSWORD}@cluster-crystal.wasylt1.mongodb.net/`,
    // "mongodb+srv://oyeniranexcellenced:'Excely2!@#'@cluster-crystal.wasylt1.mongodb.net/",
    secret: "this_is_work_for_trollbasket",
  },
  production: {
    databaseurl:
      "mongodb+srv://excellence-oyeniran:excelly2000@test-cluster.4ekj5.mongodb.net/trollbasket",
    // `mongodb+srv://oyeniranexcellenced:${process.env.DATABASE_PASSWORD}@cluster-crystal.wasylt1.mongodb.net/`,
    // "mongodb+srv://oyeniranexcellenced:Excely2!@#@cluster-crystal.wasylt1.mongodb.net/",
    secret: "this_is_work_for_trollbasket",
  },
};
