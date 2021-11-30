const sql = require("./db.js");

// constructor
const Apply = function(apply) {
  this.id_comp = apply.id_comp;
  this.id_adv = apply.id_adv;
  this.customer_name = apply.customer_name;
  this.cv = apply.cv;
  this.content = apply.content;
};

Apply.create = (newApply, result) => {
 
        sql.query("INSERT INTO apply SET ?", newApply, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("adv applied: ", { id_apply: res.insertId, ...newApply });
            result(null, { id_apply: res.insertId, ...newApply });
          });
    }
module.exports = Apply;