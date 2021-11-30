const Customer = require("../models/customer.model.js");
const sql = require('../models/db.js');
const session = require('express-session');


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    const sess = req.session;
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Customer
    const customer = new Customer({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      compagnie: false,
    });
    // Save Customer in the database
    if (req.body.compagnie !== undefined){
        customer.compagnie = true;
    }
    console.log(customer);
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
        else{
          if (sess.username !== "ADMIN"){
              res.redirect('/')
          } else {
            res.redirect('/admin');
          }
      } 
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    });
  };

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
const sess = req.session;
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Customer.updateById(
      req.params.customerId,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.customerId
            });
          }
        } else{
          if(sess.username !== 'ADMIN'){
            sql.query('SELECT * from customers WHERE email = ?',[req.body.email], (err, result) => {
              sess.password = result[0].password;
              sess.username = result[0].NAME;
              sess.email = data.email;
              sess.connected = true;
              sess.id_customer = result[0].id;
              sess.compagnie = req.body.compagnie;
              res.status(200).redirect("/profile");
            })
          }
            else {
              res.status(200).redirect("/admin");
            }
        }
      }
    );
  };

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
const sess = req.session;
    Customer.remove(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else {
        if(sess.username !== "ADMIN"){
          sess.destroy();
          res.status(200).redirect("/");
        }
          else {
            res.status(200).redirect("/admin");
          }
        }
    });
  };
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };
