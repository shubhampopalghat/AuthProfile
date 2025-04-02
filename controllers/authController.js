const bcrypt = require('bcryptjs');
const userModel = require('../models/user-model');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    let { firstname, lastname, email, password , profilepic } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        req.flash('error' ,'already existed user');
    } else {
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let createdUser = await userModel.create({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                    profilepic
                });
                req.flash('success', 'user created successfully');
                res.redirect('/login');
            });
        });
    };
};

module.exports.loginUser = async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error' , 'user not found');
        res.redirect('/login');
    }
    else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            req.flash('success', 'Logged in successfully');
            let token = generateToken(user);
            res.cookie('token', token);
            res.redirect('/profile');
        } else {
            req.flash('error', 'Invalid password');
            res.redirect('/login');
        }
    });
}
};
