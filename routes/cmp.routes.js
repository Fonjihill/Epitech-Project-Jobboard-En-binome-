module.exports = app => {
    const cmp = require("../controller/cmp.controller.js");
  
    app.post("/cmps", cmp.create);
  
    app.get("/cmps", cmp.findAll);
  
    app.get("/cmps/:cmpId", cmp.findOne);
  
    app.post("/cmps/:cmpId", cmp.update);
  
    app.delete("/cmps/:cmpId", cmp.delete);
  
    app.delete("/cmps",cmp.deleteAll);
  };