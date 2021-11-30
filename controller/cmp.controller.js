const Cmp = require("../models/cmp.model.js");

// Create and Save a new Ad
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create an Cmp
    const cmp = new Cmp({
        name_comp: req.body.name_comp,
        info_comp: req.body.info_comp,
        secteur: req.body.secteur,
        id_adv: req.body.id_adv,
      });
    // Save Cmp in the database
   Cmp.create(cmp, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the cmpertisement."
        });
      else res.send(data);
    });
  };

// Retrieve all ads from the database.
exports.findAll = (req, res) => {
    Cmp.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cmps."
        });
      else res.send(data);
    });
  };

// Find a single ad with a cmpId
exports.findOne = (req, res) => {
    Cmp.findById(req.params.cmpId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found cmp with id ${req.params.cmpId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving cmp with id " + req.params.cmpId
          });
        }
      } else res.send(data);
    });
  };

// Update a cmp identified by the cmpId in the request
exports.update = (req, res) => {
  sess = req.session;
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    Cmp.updateById(
      req.params.cmpId,
      new Cmp(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cmps with id ${req.params.cmpId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Cmp with id " + req.params.cmpId
            });
          }
        } else {
          if (sess.username !== "ADMIN"){
            res.send(data);
            
          }
          else {
            res.status(200).redirect("/admin");
          }
        }
      }
    );
  };

// Delete an cmp with the specified cmpId in the request
exports.delete = (req, res) => {
    Cmp.remove(req.params.cmpId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cmp with id ${req.params.cmpId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Cmp with id " + req.params.cmpId
          });
        }
      } else res.send({ message: `Cmp was deleted successfully!` });
    });
  };
// Delete all cmps from the database.
exports.deleteAll = (req, res) => {
    Cmp.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cmps."
        });
      else res.send({ message: `All cmps were deleted successfully!` });
    });
  };
