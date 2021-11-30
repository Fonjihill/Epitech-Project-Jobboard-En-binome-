const Auth = require("../models/auth.model.js");
const session = require('express-session');
const sql = require('../models/db.js');
exports.login = (req, res) => {
const sess = req.session;
 // Validate request
 if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const auth = new Auth({
      email: req.body.email,
      password: req.body.password,
  });

  Auth.login(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while loging in."
      });
    if (data === "Mot de passe ou email incorrect"){
      res.status(200).redirect('/connexion');
    }
    else{
       sql.query('SELECT * from customers WHERE email = ?',[auth.email], (err, result) => {
        sess.password = result[0].password;
        sess.username = result[0].NAME;
        sess.email = data.email;
        sess.connected = true;
        sess.id_customer = result[0].id;
        sess.compagnie = result[0].compagnie;
        console.log(sess);
        if (result[0].NAME === "ADMIN"){
          res.status(200).redirect('/admin');
        } else {
          res.status(200).redirect('/offres');
        }
      })
    }
  });
}