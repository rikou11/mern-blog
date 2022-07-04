

const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
// get all workouts
const getAllWorkoutController = async (req, res) => {
    try {
        const workout = await Workout.find({});
        // we can do .find({reps:20}) to get only workouts with 20 reps
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }


}
// get one workout 
const getOneWorkoutController = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'Invalid id' });
    }

    try {
        const workout = await Workout.findById({ _id: id })
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }


}
//update workout 
const updateWorkoutController = async (req, res) => {
    // const { title, load, reps } = req.body
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'Invalid id' });
    }
    try {
        //  {... req.body}
        const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });



        if (!workout) {
            res.json({ message: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }

}

// create workout
const createWorkoutController = async (req, res) => {
    const workout = new Workout({ reps: req.body.resp, title: req.body.title, load: req.body.load }
    );
    try {
        const creatworkout = await workout.save();
        res.status(201).json(creatworkout);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }


}
//delete workout

const deleteWorkoutController = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'Invalid id' });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        res.status(200).json({ message: 'workout deleted successfully' });

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}


//  middleware
const getWorkoutById = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'Invalid id' });
    }

    try {
        const workout = await Workout.find({})
        if (!workout) {
            return res.status(404).send({ message: 'workout not found' });
        }

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
    req.workout = workout;
    next();
}




module.exports = {
    getAllWorkoutController,
    createWorkoutController,

    getOneWorkoutController
    , updateWorkoutController
    , deleteWorkoutController
}