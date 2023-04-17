const { User, Thought } = require("../models");

const userController = {
    // Getting all users 
    getUsers(req, res) {
      User.find()
        .select("-__v")
        .then((dbUserData) => {
          res.json(dbUserData);
        })
       
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // getting user by a single ID
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts")
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "ERROR: no user was found by this ID! check the ID and try again!" });
          }
          res.json(dbUserData);
        })
   
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    //creating a new user
    createUser(req, res) {
      User.create(req.body)
        .then((dbUserData) => {
          res.json(dbUserData);
        })

        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Updating the user
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "ERROR: no user was found by this ID! check the ID and try again!" });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Deletes user 
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "ERROR: no user was found by this ID! check the ID and try again!" });
          }
          // for bonus points
          return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
          res.json({ message: "THE USER HAS BEEN DELETED!" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Adding a friend to the friends list 
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "ERROR: no user was found by this ID! check the ID and try again!" });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Removing a friend from the user friends list
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "ERROR: no user was found by this ID! check the ID and try again!" });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  };
  
  //exporting
  module.exports = userController;