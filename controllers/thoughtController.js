const { User, Thought } = require("../models");

module.exports = {
  // Getting all thoughts
  getThought(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // getting a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "ERROR: No thought has been found with the ID inputted! Try again!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //creating a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "ERROR: No thought has been found with the ID inputted! Try again!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //updating a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "ERROR: No thought has been found with the ID inputted! Try again!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //deleting a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "ERROR: No thought has been found with the ID inputted! Try again!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'ERROR: Thought has been deleted but no user has been found with this ID! Please check the ID!'})
          : res.json({ message: 'Thought has been successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  //creating a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "ERROR: No thought has been found with the ID inputted! Try again!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //deleting a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "ERROR: No thought has been found with the ID inputted! Try again!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};