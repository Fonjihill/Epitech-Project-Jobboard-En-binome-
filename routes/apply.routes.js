module.exports = app => {
    const apply = require("../controller/apply.controller.js");
  
    app.post("/apply", apply.create);
  };