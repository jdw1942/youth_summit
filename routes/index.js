var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/", function(req, res){
    res.render("landing");
});

// SHOW REGISTRATION PAGE
router.get("/register", function(req, res){
    res.render("register");
});

// ADD NEW USER TO DB
router.post("/register", function(req, res){
    var newUser =new User({conference: req.body.conference, name: req.body.name, email: req.body.email, phone: req.body.phone, username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            // req.flash("error", err.message);                    
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Hi " + user.name + ", Welcome to Youth Summit!"); 
            res.redirect("/profile");
        });
    });   
});

// SHOW LOGIN PAGE
router.get("/login", function(req, res){
    res.render("login");
});

// login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/profile", 
        failureRedirect: "/login" 
    }), function(req, res){
});

// handling logout logic 
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Success, You have been logged out.")
    res.redirect("/");
});

module.exports = router;
