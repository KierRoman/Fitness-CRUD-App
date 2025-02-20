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
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    // const exercises = await User.workouts.exercises.find()
    res.render('workouts/new.ejs', {
        user: user,
    workouts: workouts
    })
})


//DELETE


//UPDATE


//CREATE
router.post('/', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    user.workouts.push(req.body)
        await user.save()
        res.redirect(`/users/${user._id}/workouts`)

})


//EDIT


//SHOW
router.get('/:workoutId/', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    const exercises = workouts.exercises || []
    res.render('workouts/show.ejs', {
        workouts: workouts,
        exercises: exercises
    })
})



module.exports = router