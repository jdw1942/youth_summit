var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    flash          = require("connect-flash"),
    methodOverride = require("method-override"),
    nodemailer     = require("nodemailer"),
    User           = require("./models/user"),
    Story          = require("./models/story")

// REQUIRE ROUTES
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/youth_summit");
// mongoose.connect("mongodb://james:JuDuW1942@ds255308.mlab.com:55308/yelp_camp_jdw1942");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Jesus is coming again",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to check user is logged in
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });

app.use("/", indexRoutes);
// app.use("/campgrounds",campgroundRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);



app.get("/about", function(req, res){
    res.render("about");
});

app.get("/about/faq", function(req, res){
    res.render("about/faq");
});

app.get("/about/new", function(req, res){
    res.render("about/new");
});

app.get("/conferences", function(req, res){
    res.render("conferences");
});

app.get("/conferences/order", function(req,res){
    res.render("conferences/order");
});

app.get("/contact", function(req, res){
    res.render("contact");
});

app.get("/programs", function(req, res){
    res.render("programs/index");
});

// email route

// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: "jdw1942@gmail.com", // generated ethereal user
//         pass: "Jdw1992@gmail.com" // generated ethereal password
//     }
// });

// let mailOptions = {
//     from: '"Fred Foo 👻"jdw1942@gmail.com', // sender address
//     to: 'jdw1992@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>' // html body
// };

// transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//     });


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });