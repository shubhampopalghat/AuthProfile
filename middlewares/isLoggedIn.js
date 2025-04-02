const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'Please login first'); 
        return res.redirect('/login');           
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            req.flash('error', 'Please retry login');  
            return res.redirect('/login');         
        }

        req.user = user;
        next();
    } catch (err) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/login');               
    }
};
