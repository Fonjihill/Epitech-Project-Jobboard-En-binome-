module.exports = app => {
    const adv = require("../controller/adv.controller.js");
  
    app.post("/advs", adv.create);
  
    app.get("/advs", adv.findAll);
  
    app.get("/advs/:advId", adv.findOne);
  
    app.put("/advs/:advId", adv.update);
  
    app.post("/advsdel/:advId", adv.delete);
  
    app.delete("/advs",adv.deleteAll);
  };