const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default: "user.svg"
    }
});

module.exports = mongoose.model('user', userSchema);