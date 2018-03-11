var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


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
            req.flash("error", err.message);                    
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Hi " + user.name + ", Welcome to Youth Summit!"); 
            res.redirect("conferences");
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
        successRedirect: "/conferences", 
        failureRedirect: "/login" 
    }), function(req, res){
});


// NEW STORY
router.post("/about/stories", middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var description = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newStory =new Story({title: title, image: image, description: discription, author: author});
    Story.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("about/stories");
        }
    })
});

module.exports = router;