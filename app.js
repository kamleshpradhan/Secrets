//jshint esversion:6
require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const md5 = require('md5');


console.log(md5(12345))


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs")


mongoose.connect('mongodb://localhost:27017/userdb', {useNewUrlParser: true,useUnifiedTopology: true });

const usersSchema = new mongoose.Schema({
    email: String,
    password: String
})




const users = new mongoose.model('User',usersSchema);

app.get('/',function(req,res){
    res.render("home")
});
app.get("/Login",function(req,res){
    res.render("login")
})
app.get('/register',function(req,res){
    res.render("register")
})
// app.get('/secrets',function(req,res){
//     res.render("secrets")
// })
// app.get('/submit',function(req,res){
//     res.render("submit")
// })

app.post('/register',function(req,res){
    const newUser = new users({
        email:req.body.username,
        password:md5(req.body.password)
    })
    newUser.save(function(err){
        if (err){
            console.log(err)
        }else{
            res.render('secrets')
        }
    })
})

app.post('/login',function(req,res){
    const username = req.body.username
    const password = md5(req.body.password)
    users.findOne({email:username},function(err,founduser){
        if(err){
            console.log(err)
        }else{
            if(founduser){
                if(founduser.password===password){
                    res.render('secrets')
                }
            }
        }
    })
})
















app.listen(3000,function(req,res){
    console.log("Server started on port 3000")
})




















