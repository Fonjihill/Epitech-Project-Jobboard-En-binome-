const Apply = require("../models/apply.model.js");

// Create and Save a new Ad
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create an Adv
    const apply = new Apply({
        id_comp: req.body.id_comp,
        id_adv: req.body.id_adv,
        customer_name: req.body.customer_name,
        cv: req.body.cv,
        content: req.body.content,
    });
    // Save Adv in the database
   Apply.create(apply, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the advertisement."
        });
      else res.send(data);
    });
  };