const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const pool = mysql.createPool({
    connectionLimit: 10,
    host:  process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

//The connection
exports.connexion = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body)

        if(!email || !password) {
             res.status(400).render('connexion', {
                message: 'Veuillez inserer le correct mot passe et  addresse mail'
            });
            
        }
        pool.query('SELECT * FROM people WHERE email = ?', [email], async (error, result) =>{
            console.log(result)
            if(!result || (await bcrypt.compare.password, result[0].password)){
                 res.status(401).render('connexion', {
                    message: 'Mot de passe ou addresse mail incorrect'
                })
            } else {
                console.log(result);
                const id = result[0].id;

                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("token: " + token)

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ), 
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");

                
            }
            
        })
    
    } catch (error) {
        console.log(error)
        
    }
    
}

// The inscription 
exports.inscription = (req, res) => {
    //We load the body
    console.log('test')
    console.log(req.body);

    //We create a constant to get the name type which is in the inscription form
    const { name, email, password, passwordConfirm} = req.body;
    pool.query('SELECT email FROM people WHERE email = ? ', [email], async (error, result) => {
        if(error){
            console.log(error);
        } if(result.length > 0 ){
            return res.render('inscription' , {
                message: 'Cet email éxiste déjà'
            })
        } else if(password !== passwordConfirm) {
            return res.render('inscription' , {
                message: 'Mot de passe different'
            })
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        //res.send("je teste")
        // Ici on insere les données dans la base de données 
        //On posera la condition en fonction du type d'utilisateur soit un user normal ou une compagnie

        //Insertion de l'utilisateur
        pool.query('INSERT INTO people SET ?', {name: name, email: email, password: hashedPassword }, (error, results) => {
            if(error){
                console.log(error);
            }else {
                console.log(results);
                res.render('inscription', {
                    message: 'Bienvenue'
                })
            }
        })


    });
}


exports.isLoggedIn = async (req, res, next) => {
    // check if the user is log In
    req.message = "We are in profile"
    //Check if there is a cookie while the User is logged
   // console.log(req.cookies.jwt)
    if(req.cookies){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies,
                // We check the secret password use while creating the jwt_secret
                process.env.JWT_SECRET
                );

                //console.log(decoded)
                // Now we gonna check if the user is in the database
                pool.query('SELECT * FROM people WHERE id_people = ?', [decoded.id], (error, result) => {
                    console.log(result)

                    if(!result){
                        return next();
                    }

                    req.user = result[0];
                    return next();
                });
        }catch(error){
            console.log(error)
            return next();
        }
    } else{
        next();
    }
    
}