// const express = require('express')
// const router = express.Router()

// const User = require('../models/user.js');


// //I
// router.get('/', async (req, res) => {
//     const user = await User.findById(req.session.user._id);
//     const workouts = user.workouts.id(req.params.workoutId); // Get the specific workouts
//     // const exercises = workouts.exercises; // Get the exercises associated with this workouts
//     const exercises = user.exercises || []
//     res.render('workouts/exercises/index.ejs', {
//         user: user,
//         workouts: user.workouts,   // Pass the specific workout
//         exercises: exercises
//     })
//     console.log(user.exercises)
// })

// //NEW
// router.get('/new', async (req, res) => {
//     const user = await User.findById(req.session.user)
//     const workouts = user.workouts.id(req.params.workoutId)
//     res.render('workouts/new.ejs', {
//         user: user,
//         workouts: workouts
//     })
// })


// //D


// //U


// //C
// router.post('/', async (req, res) => {
//     const user = await User.findById(req.session.user._id)
//     user.exercises.push(req.body)
//         await user.save()
//         res.redirect(`/users/${user._id}/exercises`)
// })

// //E


// //S
// router.get('/:workoutId/', async (req, res) => {
//     const user = await User.findById(req.session.user)
//     const workouts = user.workouts.id(req.params.workoutId)
//     const exercises = workouts.exercises || []
//     res.render('workouts/show.ejs', {
//         workouts: workouts,
//         exercises: exercises
//     })
// })











// module.exports = router