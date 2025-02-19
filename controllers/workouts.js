const express = require('express')
const router = express.Router()

const User = require('../models/user.js');

//INDEX
router.get('/', async (req, res) => {
    const users = await User.find()

    let allWorkouts = [];
    users.forEach(user => {
            allWorkouts = allWorkouts.concat(user.workouts);
        });

res.render('workouts/index.ejs', {workouts: allWorkouts})
})



//NEW
router.get('/new', async (req, res) => {
    const user = await User.findById(req.params.userId)
    // const exercises = await User.workouts.exercises.find()
    res.render('workouts/new.ejs', {
        // exercises: exercises,
    })
})


//DELETE


//UPDATE


//CREATE
router.post('/', async (req, res) => {
    const user = await User.findById(req.params.userId)
    

        await user.save()
        res.redirect(`/users/${user._id}/workouts`)

})


//EDIT


//SHOW

module.exports = router