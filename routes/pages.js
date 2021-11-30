const express = require('express');
const authController =  require('../controller/auth')

const router = express.Router();


router.get('/', authController.isLoggedIn,  (req, res) => {
        /*res.send("")*/

            res.render("index")
        })
    
     router.get('/views/connexion.hbs', (req, res) => {
         /*res.send("")*/
    
         res.render("connexion")
     })
    
     router.get('/views/inscription.hbs', (req, res) => {
         /*res.send("")*/
    
         res.render("inscription")
     })
     router.get('/views/profile.hbs',authController.isLoggedIn, (req, res) => {
        /*res.send("")*/
        console.log(req.message)

        if(req.user){
            res.render("profile")
            user: req.user
        }else{
            res.redirect('/views/connexion.hbs')
        }
    })
    router.get('/views/admin.hbs', (req, res) => {
        /*res.send("")*/
   
        res.render("admin")
    })

     module.exports = router;
    