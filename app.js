const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { registerUser } = require('./controllers/authController');
const { loginUser } = require('./controllers/authController');
const { isLoggedIn } = require('./middlewares/isLoggedIn');
const upload = require('./config/multerconfig');
const userModel = require('./models/user-model');


const db = require('./config/mongoose-connection');
const expressSession = require('express-session');
const flash = require('connect-flash');

require("dotenv").config();

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
})
);
app.use(flash())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('index', { error, success, loggedin: false });
});

app.get('/login', (req, res) => {
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('login', { error, success, loggedin: false });
});




app.get('/profile', isLoggedIn, async (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('profile', { user: req.user, error, success, notloggedin: false });

});

app.get('/profile/upload/:id', isLoggedIn, async (req, res) => {
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('profileupload', { user: req.user , success , error , notloggedin:false });
});

app.post('/upload/:id', isLoggedIn, upload.single("image"), async (req, res) => {
    let user = req.user;
    if (!req.file) {
        req.flash('error', 'No file uploaded');
        res.redirect(`/profile/upload/${req.params.id}`);
    }
    else {
        user.profilepic = req.file.filename;
        await user.save();
        let success = req.flash('success', 'Profile pic changed');
        res.redirect('/profile');
    }
});


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

app.post('/register', registerUser);
app.post('/login', loginUser);


const PORT = process.env.PORT || 8080;  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});