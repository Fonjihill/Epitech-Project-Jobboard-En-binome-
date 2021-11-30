const sql = require("./db.js");

// constructor
const Adv = function(adv) {
  this.name = adv.nom_adv;
  this.short = adv.desc_courte;
  this.long = adv.desc_long;
  this.type = adv.type_adv;
  this.datestart = adv.date_ajout;
  this.dateend = adv.date_fin;
  this.compagnie = adv.id_comp;
};

Adv.create = (newAdv, result) => {
 
        sql.query("INSERT INTO advertisement SET ?", newAdv, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("created ad: ", { id_adv: res.insertId, ...newAdv });
            result(null, { id_adv: res.insertId, ...newAdv });
          });
    }

Adv.findById = (adId, result) => {
  sql.query(`SELECT * FROM advertisement WHERE id_adv = ${adId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found adv: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found adv with the id_adv
    result({ kind: "not_found" }, null);
  });
};

Adv.getAll = result => {
  sql.query("SELECT * FROM advertisement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // console.log("advs: ", res);
    result(null, res);
  });
};

Adv.updateById = (id_adv, adv, result) => {
  sql.query(
    "UPDATE advertisement SET nom_adv = ?, desc_courte = ?, desc_long = ?, type_adv = ?, date_ajout = ?, date_fin = ?, id_comp = ?, WHERE id_adv = ?",
    [adv.name, adv.desc_courte, adv.desc_long, adv.type, adv.datestart, adv.dateend, adv.compagnie, id_adv],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ad with the id_adv
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated adv: ", { id_adv: id_adv, ...adv });
      result(null, { id_adv: id_adv, ...adv });
    }
  );
};

Adv.remove = (id_adv, result) => {
  sql.query("DELETE FROM advertisement WHERE id_adv = ?", id_adv, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found adv with the id_adv
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted adv with id_adv: ", id_adv);
    result(null, res);
  });
};

Adv.removeAll = result => {
  sql.query("DELETE FROM advertisement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} advertisements`);
    result(null, res);
  });
};

module.exports = Adv;