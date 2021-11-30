const express = require('express');
const bodyparser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv');
const session = require('express-session')
const redis = require('redis');
const connectRedis = require('connect-redis');
const { request } = require('http');
const { cp, copyFile } = require('fs');
const { response } = require('express');
const app = express();
const fetchP = import('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))
const port = process.env.PORT || 5000
const imageDirectory = path.join(__dirname + './images')
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json());
dotenv.config({path: './.env'})
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/images', express.static(__dirname + '/public/images'))
app.set(express.static(imageDirectory))
app.set('view engine', 'hbs')
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))
app.get('/',(req, res) => {
    const sess = req.session;
    if (sess.username && sess.password) {
        if (sess.username) {
            res.render('index', {session: req.session});
        }
    } else {
        res.render('index')
    }
});
app.get('/connexion', (req, res) => {
        res.render("connexion")
})
app.get('/profile', (req, res) => {
    if(req.session.username){
        res.render("profile", {session : req.session})
    }
    else {
        res.status(404).redirect('/');
    }
})
    app.get('/inscription', (req, res) => {
        res.render("inscription")
})
app.get('/404', (req, res) => {
    res.render("404")
})
app.get('/admin', (req, res) => {
    async function load()
    {
        let response0 = await fetch('http://localhost:5000/cmps')
        let data0 = await response0.json();
        global.cmp = data0;
        let response = await fetch('http://localhost:5000/advs')
        let data = await response.json();
        global.advs = data;
    }
    load();
    fetch('http://localhost:5000/customers')
    .then(res => res.json())
    .then(json => {
        let users = json;
        if(req.session.username === "ADMIN"){
            console.log(global.cmp);
            res.render("admin", {users: users, advs: global.advs, cmp: global.cmp})
        }
        else{
            res.status(404).redirect('/404');
        }
    })
})
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/")
    });
});
app.get('/offres', (req, res) => {
    async function load()
    {
        let response = await fetch('http://localhost:5000/advs')
        let data = await response.json();
        let response1 = await fetch('http://localhost:5000/cmps')
        let data1 = await response1.json();
        advs = data;
        cmps = data1;
        res.render("offres", {session: req.session, advs: advs});
    }
    load();
})
app.get('/entreprises', (req, res) => {
    res.render("entreprises", {session: req.session});
})
app.get('/offre-detail', (req, res) => {
    res.render("offres-detail", {session: req.session});
})
app.get('/postuler', (req, res) => {
    res.render("postuler", {session: req.session});
})
app.get('/succes', (req, res) => {
    res.render("succes", {session: req.session});
})
require("./routes/cmp.routes")(app);
require("./routes/adv.routes")(app);
require("./routes/customer.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/apply.routes")(app);
app.listen(port, () => console.log(`listening on port ${port}` ))

