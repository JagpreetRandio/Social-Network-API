const router = require('express').Router();

// all info
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// getting thoughts and posting the thoughts
router.route('/').get(getThought).post(createThought);

// getting a single thought, putting thought, and deleting thought
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions POST new reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

// gettting reaction and deleting that reaction with the ID
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

//exporting all information 
module.exports = router;