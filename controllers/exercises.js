const express = require('express')
const router = express.Router()

const User = require('../models/user.js');


//I
router.get('/', async (req, res) => {
    const users = await User.find().populate('workouts.exercises')
    
    let allExercises = [];
    users.forEach(user => {
        user.workouts.forEach(workout => {
            allExercises = allExercises.concat(workout.exercises);
        });
    });

    res.render('exercises/index.ejs', {exercises: allExercises})
})

//NEW
router.get('/new', async (req, res) => {
    const users = await User.find().populate('workouts.exercises')
    
    let allExercises = [];
    users.forEach(user => {
        user.workouts.forEach(workout => {
            allExercises = allExercises.concat(workout.exercises);
        });
    });
        res.render('exercises/new.ejs', {exercises: allExercises})
})


//D


//U


//C


//E


//S











module.exports = router