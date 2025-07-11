const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')

const path = require("path");


const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const usersController = require('./controllers/users.js')
const authController = require('./controllers/auth.js')
const workoutsController = require('./controllers/workouts.js')
const User = require('./models/user.js')


const port = process.env.PORT ? process.env.PORT : '3000'

const main = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(port, () => {
        console.log(`App is running on port ${port}...`)
    })
}
main()
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(flash())


app.use((req, res, next) => {
    res.locals.message = req.flash('message'); // Make flash message available globally
    next();
  });

app.get('/', async (req, res) => {
    const user = await User.findById(req.session.user)

    res.render('home.ejs', {
        user: user,
        message: req.flash('message')
    })
})



app.use(passUserToView)
app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users', usersController)
app.use('/users/:userId/workouts', workoutsController)

