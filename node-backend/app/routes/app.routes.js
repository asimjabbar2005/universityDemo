module.exports = (app) => {
  const universities = require("../controllers/university.controller.js");

  var router = require("express").Router();

  // Create a new university
  router.post("/", universities.create);

  // Retrieve all Universities
  router.get("/", universities.findAll);

  // Search all Universities by country
  router.get("/search", universities.search);

  // Update a University with id
  router.put("/:id", universities.update);

  // Get a University with id
  router.get("/:id", universities.findOne);

  app.use("/api/universities", router);
};
