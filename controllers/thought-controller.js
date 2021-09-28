const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getThoughtById(req, res) {
    Thought.findById({ _id: req.params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          { _id: req.body.usernameId },
          { $push: { thoughts: dbThoughtData._id } }
        );
        console.log(req.body.usernameId);
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Cannot find Thought with this Id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with that id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err));
  },
};
module.exports = thoughtController;
