const Adv = require("../models/adv.model.js");

// Create and Save a new Ad
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create an Adv
    const adv = new Adv({
        name: req.body.name,
        short: req.body.short,
        long: req.body.long,
        type: req.body.type,
        datestart: req.body.datestart,
        dateend: req.body.dateend,
        compagnie: req.body.compagnie,
    });
    // Save Adv in the database
   Adv.create(adv, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the advertisement."
        });
      else res.send(data);
    });
  };

// Retrieve all ads from the database.
exports.findAll = (req, res) => {
    Adv.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving advs."
        });
      else res.send(data);
    });
  };

// Find a single ad with a advId
exports.findOne = (req, res) => {
    Adv.findById(req.params.advId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found adv with id ${req.params.advId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving adv with id " + req.params.advId
          });
        }
      } else res.send(data);
    });
  };

// Update a adv identified by the advId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Adv.updateById(
      req.params.advId,
      new Adv(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Advs with id ${req.params.advId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Adv with id " + req.params.advId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete an adv with the specified advId in the request
exports.delete = (req, res) => {
const sess = req.session;
    Adv.remove(req.params.advId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Adv with id ${req.params.advId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Adv with id " + req.params.advId
          });
        }
      } else {
        if (sess.username !== "ADMIN"){
          res.send({ message: `Adv was deleted successfully!` });
        }
        else {
          res.status(200).redirect("/admin");
        }
      }
      });
  };
// Delete all advs from the database.
exports.deleteAll = (req, res) => {
    Adv.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all advs."
        });
      else res.send({ message: `All advs were deleted successfully!` });
    });
  };
