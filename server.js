const express = require("express");
const session = require('express-session');
const nocache = require('nocache');
const hbs = require("hbs");

const app = express();
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const username = "adithyanbinu666@gmail.com";
const password = "Adhi@123";


app.use(session({
    secret: 'it should be very sensitive',
    resave: false,
    saveUninitialized: true,
}))

app.use(nocache())


app.get("/", (req, res) => {
    
    if(req.session.user){
        res.render('home');
    }else{

        if(req.session.passwordwrong){
            res.render('login', { message: "invalid credentials" });
            req.session.passwordwrong=false;
        }else{
            res.render('login');
        }
    }
})

app.post("/verify", (req, res) => {

    if (req.body.username === username && req.body.password === password) {
        req.session.user = req.body.username
        res.redirect("/")

    } else {
        req.session.passwordwrong = true
        res.redirect("/")
    }

})


app.get("/logout",(req,res)=>{
    req.session.destroy();
   res.redirect('/')


})

app.listen(3333, () => {
    console.log("running");

});