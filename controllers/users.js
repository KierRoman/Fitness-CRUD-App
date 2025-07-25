const express = require('express')
const router = express.Router()

const User = require('../models/user.js');

router.get('/', async (req, res ) => {
    const user = req.session.user

     if (user && user.username) {
        user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
    }
    

    const users = await User.find({})
    
    const formattedUsers = users.map(u => ({
        ...u._doc,
        username: u.username.charAt(0).toUpperCase() + u.username.slice(1)
    }));

    res.render('users/index.ejs',{
        user: user,
        users: formattedUsers
    })
})









module.exports = router