const router = require('express').Router();

//all info
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// Get User and Posting User
router.route('/').get(getUsers).post(createUser);

// we are getting a user, putting user, and deleting the user with thier ID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// we are looking at the friends with their ID, posting the friend, and deleting the friend 
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// exporting all the information 
module.exports = router;