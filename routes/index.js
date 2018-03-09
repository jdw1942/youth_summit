var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});


router.post("/register", function(req, res){
    var newUser =new User({conference: req.body.conference, name: req.body.name, email: req.body.email, phone: req.body.phone, username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);                    
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Hi " + user.name + ", Welcome to Youth Summit!"); 
            res.redirect("conferences");
        });
    });   
});

// login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/conferences", 
        failureRedirect: "/login" 
    }), function(req, res){
});

module.exports = router;