const express = require('express')
const router = express.Router()

const User = require('../models/user.js');

//INDEX
router.get('/', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    res.render('workouts/index.ejs', {
        workouts: user.workouts
    })
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
router.get('/:workoutId/exercises/new', async (req, res) => {
    const user = await User.findById(req.session.user)
    const workouts = user.workouts.id(req.params.workoutId)
    res.render('workouts/exercises/new.ejs', {
        user: user,
        workouts: workouts
    })
})

//DELETE
router.delete('/:workoutId', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    user.workouts.id(req.params.workoutId).deleteOne()
    await user.save()
    res.redirect(`/users/${user._id}/workouts`)
})


router.delete('/:workoutId/exercises/:exerciseId', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    const exercises = workouts.exercises.id(req.params.exerciseId)
    workouts.exercises.pull(exercises._id)
        await user.save()
    res.redirect(`/users/${user._id}/workouts/${workouts._id}`)
})




//UPDATE
router.put('/:workoutId', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    workouts.set(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/workouts`)
})


router.put('/:workoutId/exercises/:exerciseId', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    const exercises = workouts.exercises.id(req.params.exerciseId)
    exercises.set(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/workouts/${workouts._id}`)
})




//CREATE
router.post('/', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    user.workouts.push(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/workouts`)

})

router.post('/:workoutId', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    workouts.exercises.push(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/workouts/${workouts._id}`)
})



//EDIT
router.get('/:workoutId/edit', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    res.render('workouts/edit.ejs', {
        user: user,
        workouts: workouts,
    })
})

router.get('/:workoutId/exercises/:exerciseId/edit', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    const exercises = workouts.exercises.id(req.params.exerciseId)
    res.render('workouts/exercises/edit.ejs', {
        user: user,
        workouts: workouts,
        exercises: exercises
    })
})




//SHOW
//doubles as workouts index
router.get('/:workoutId', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
    const exercises = workouts.exercises
    res.render('workouts/show.ejs', {
        workouts: workouts,
        exercises: exercises
    })
})

// router.get('/:workoutId/exercises', async (req, res) => {
//     const user = await User.findById(req.session.user._id);
//     const workouts = user.workouts.id(req.params.workoutId); // Get the specific workouts
//     // const exercises = workouts.exercises; // Get the exercises associated with this workouts
//     const exercises = user.exercises || []
//     res.render('workouts/exercises/index.ejs', {
//         user: user,
//         workouts: workouts,   // Pass the specific workout
//         exercises: exercises
//     })
// })


module.exports = router