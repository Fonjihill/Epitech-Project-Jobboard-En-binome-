const sql = require("./db.js");
const session = require('express-session')
// constructor
const Auth = function(auth) {
    this.email = auth.email;
    this.password = auth.password;
  };

 Auth.login = (auth, res) => {
     sql.query('SELECT * FROM customers WHERE email = ?', [auth.email], async (error, result) =>{
         if (error){
             console.log("Erreur :"+error);
             res(error, null);
             return;
        }
        else if(result === null || result[0] === undefined || auth.password !== result[0].password){
            res(null, 'Mot de passe ou email incorrect');
        } 
        else {
                  res(null, auth)
  }
})
}

Auth.isLoggedIn = (auth, res) => {
    sql.query('SELECT token INTO customers WHERE email = ?', auth.email, (err, result) => {
        if (auth.token === result[0]){
            console.log("true");
            res.send(true);
        } else {
            console.log("false");
            res.send(false);
        }
    }) 
}
module.exports = Auth;