const express = require('express')
const router = express.Router()

const User = require('../models/user.js');

//INDEX
router.get('/', async (req, res) => {
    const user = await User.findById(req.session.user._id)

    const sortedWorkouts = [...user.workouts].sort((a, b) => new Date(a.date) - new Date(b.date));

    let month = parseInt(req.query.month);
    let year = parseInt(req.query.year);

    if(isNaN(month) || isNaN(year)) {
        const todayFallback = new Date();
        month = todayFallback.getMonth();
        year = todayFallback.getFullYear();
    
    }

    res.render('workouts/index.ejs', {
        user,
        workouts: sortedWorkouts,
        month,
        year
    })
})




//NEW

router.get('/new', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    const workouts = user.workouts.id(req.params.workoutId)
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
    try {
        const user = await User.findById(req.session.user._id)
        user.workouts.id(req.params.workoutId).deleteOne()
        await user.save()
        res.redirect(`/users/${user._id}/workouts`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


router.delete('/:workoutId/exercises/:exerciseId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const workouts = user.workouts.id(req.params.workoutId)
        const exercises = workouts.exercises.id(req.params.exerciseId)
        workouts.exercises.pull(exercises._id)
        await user.save()
        res.redirect(`/users/${user._id}/workouts/${workouts._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})




//UPDATE
router.put('/:workoutId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const workouts = user.workouts.id(req.params.workoutId)
        workouts.set(req.body)
        await user.save()
        res.redirect(`/users/${user._id}/workouts`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


router.put('/:workoutId/exercises/:exerciseId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const workouts = user.workouts.id(req.params.workoutId)
        const exercises = workouts.exercises.id(req.params.exerciseId)
        exercises.set(req.body)
        await user.save()
        res.redirect(`/users/${user._id}/workouts/${workouts._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})




//CREATE
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const { name, duration, notes } = req.body;

        const dateInput = req.body.date;
        const localMidnight = new Date(dateInput + 'T00:00:00');

        const newWorkout = {
            name,
            duration,
            notes,
            date: localMidnight,
        };

        user.workouts.push(newWorkout)
        await user.save()
        res.redirect(`/users/${user._id}/workouts`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/:workoutId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const workouts = user.workouts.id(req.params.workoutId)
        workouts.exercises.push(req.body)
        await user.save()
        res.redirect(`/users/${user._id}/workouts/${workouts._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})



//EDIT
router.get('/:workoutId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const workouts = user.workouts.id(req.params.workoutId)
        res.render('workouts/edit.ejs', {
            user: user,
            workouts: workouts,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:workoutId/exercises/:exerciseId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const workouts = user.workouts.id(req.params.workoutId)
        const exercises = workouts.exercises.id(req.params.exerciseId)
        res.render('workouts/exercises/edit.ejs', {
            user: user,
            workouts: workouts,
            exercises: exercises
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})




//SHOW
//doubles as workouts index
router.get('/:workoutId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const workouts = user.workouts.id(req.params.workoutId)
        const exercises = workouts.exercises
        res.render('workouts/show.ejs', {
            workouts: workouts,
            exercises: exercises
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})



module.exports = router