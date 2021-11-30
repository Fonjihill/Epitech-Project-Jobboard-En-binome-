module.exports = app => {
    const auth = require("../controller/auth.controller.js");
  
    // Login
    app.post("/auth", auth.login);
  };