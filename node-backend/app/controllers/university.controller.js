const db = require("../models");
const University = db.universities;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const university = {
    domains: req.body.domains,
    name: req.body.name,
    alpha_two_code: req.body.alpha_two_code,
    web_pages: req.body.web_pages,
    state_province: req.body.state_province,
    country: req.body.country,
  };

  University.create(university)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

exports.findAll = (req, res) => {
  University.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving universities",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  University.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving universities",
      });
    });
};

exports.search = (req, res) => {
  const country = req.query.country;
  var condition = country ? { country: { [Op.like]: `%${country}%` } } : null;

  University.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving universities",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  University.update(req.body, {
    where: { id: id },
  })
    .then((output) => {
      if (output == 1) {
        res.send({
          message: "University was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update university with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occured while updating university with id=" + id,
      });
    });
};
