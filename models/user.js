var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    conference: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    phone: {type: String, required: true},
    username: {type: String, required: true, lowercase: true, unique: true},
    password:{type: String, required: true}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

