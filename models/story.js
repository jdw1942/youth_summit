var mongoose = require("mongoose");

var StorySchema = new mongoose.Schema({
    title: String,
    image: File,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    } 
});

module.exports = mongoose.model("Story", StorySchema);