const sql = require("./db.js");

// constructor
const Cmp = function(cmp) {
  this.name_comp = cmp.name_comp;
  this.info_comp = cmp.info_comp;
  this.secteur = cmp.secteur;
  this.id_adv = cmp.id_adv;
};

Cmp.create = (newCmp, result) => {
 
        sql.query("INSERT INTO compagnie SET ?", newCmp, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("created cmp: ", { id_comp: res.insertId, ...newCmp });
            result(null, { id_comp: res.insertId, ...newCmp });
          });
    }

Cmp.findById = (cmpId, result) => {
  sql.query(`SELECT * FROM compagnie WHERE id_comp = ${cmpId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cmp: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found cmp with the id_comp
    result({ kind: "not_found" }, null);
  });
};

Cmp.getAll = result => {
  sql.query("SELECT * FROM compagnie", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // console.log("cmps: ", res);
    result(null, res);
  });
};

Cmp.updateById = (id_comp, cmp, result) => {
  console.log(cmp);
  sql.query(
    "UPDATE compagnie SET name_comp = ?, info_comp = ?, secteur = ?, id_adv = ? WHERE id_comp = ?",
    [cmp.name_comp, cmp.info_comp, cmp.secteur, cmp.id_adv, id_comp],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found cmp with the id_comp
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated cmp: ", { id_comp: id_comp, ...cmp });
      result(null, { id_comp: id_comp, ...cmp });
    }
  );
};

Cmp.remove = (id_comp, result) => {
  sql.query("DELETE FROM compagnie WHERE id_comp = ?", id_comp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found cmp with the id_comp
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cmp with id_comp: ", id_comp);
    result(null, res);
  });
};

Cmp.removeAll = result => {
  sql.query("DELETE FROM compagnie", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} compagnies`);
    result(null, res);
  });
};

module.exports = Cmp;