const router = require('express').Router();

//all info
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// Get User and Posting User
router.route('/').get(getUser).post(createUser);

// we are getting a user, putting user, and deleting the user with thier ID
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// we are looking at the friens with thier ID, posting the friend, and deleting the friend 
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

// exporting all the information 
module.exports = router;