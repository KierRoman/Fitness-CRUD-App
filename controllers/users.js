const express = require('express')
const router = express.Router()

const User = require('../models/user.js');

router.get('/', async (req, res ) => {
    const users = await User.find({})
    const workouts = users.workouts
    
    res.render('users/index.ejs',{
        users: users,
        workouts: workouts
    })
})









module.exports = router