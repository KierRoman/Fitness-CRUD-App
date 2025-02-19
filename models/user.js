const mongoose = require('mongoose')

const exercisesSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['weights','cardio'],
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    notes: {
        type: String,
    }
})


const workoutsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
    date: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
    },
    exercises: [exercisesSchema]
})




const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    workouts: [workoutsSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User