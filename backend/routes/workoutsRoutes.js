const express = require('express');

// create delete update getOne getAll + middlware(to get the workout by id) and use it in the
// update and delet and getOne by id
const { getAllWorkoutController,
    createWorkoutController,

    getOneWorkoutController
    , updateWorkoutController
    , deleteWorkoutController
} = require('../controllers/workoutController');

const router = express.Router();
// get all workout
router.get('/', getAllWorkoutController);
// get one workout
router.get('/:id', getOneWorkoutController)
// create one workout
router.post('/', createWorkoutController)

// update our workout
router.patch('/:id', updateWorkoutController

)
// delete one workout
router.delete('/:id', deleteWorkoutController)


module.exports = router;