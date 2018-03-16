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
var aboutRoutes = require("./routes/about");
var profileRouters = require("./routes/profile");

// mongoose.connect("mongodb://localhost/youth_summit");
mongoose.connect("mongodb://hhes:JuDuW1942@ds215709.mlab.com:15709/youth_summit");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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

//middleware to check user is logged in
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/about", aboutRoutes);
app.use("/profile", profileRouters);
// app.use("/campgrounds/:id/comments", commentRoutes);


app.get("/programs", function(req, res){
    res.render("programs/index");
});

app.get("/apply", (req, res) => res.render("apply"));

//email route


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });