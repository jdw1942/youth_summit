var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var Story       = require("../models/story");
var User        = require("../models/user");
var nodemailer  = require("nodemailer");
var middleware  = require("../middleware");


router.get("/", function(req, res){
    res.render("about/index");
});

router.get("/faq", function(req, res){
    res.render("about/faq");
});

router.get("/contact", function(req, res){
    res.render("about/contact");
});

router.post("/contact", function(req, res){
    const output = `
        <p>You have a new message </p>
        <h3>Details</h3>
        <table cellspacing="0" cellpadding="10" border="0">
            <tr style="background-color: #eeeeee">
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
            </tr>
            <tr>
                <td>${req.body.name}</td>
                <td>${req.body.email}</td>
                <td>${req.body.message}</td>
            <tr>
        </table
    `;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "jdw1942@gmail.com", // generated ethereal user
            pass: "Jdw1992@gmail.com" // generated ethereal password
        }
    });
    
    let mailOptions = {
        from: '"Youth Summit Contact" jdw1942@gmail.com', // sender address
        to: 'jdw1992@gmail.com', // list of receivers
        subject: 'New Message', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.redirect("/about/contact");
        });
    
});

router.get("/stories", function(req, res){
    res.render("about/stories/index");
});

router.get("/stories/new", function(req, res){
    res.render("about/stories/new");
});

// NEW STORY

router.post("/stories", middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var description = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newStory = ({title: title, image: image, description: description, author: author});
    Story.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/about/stories/");
        }
    })
});


module.exports = router;