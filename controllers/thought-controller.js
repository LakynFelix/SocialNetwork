const { Thought } = require('../models');

Thought.Controller = {
    getAllThoughts(req, res) {
        Thought.find({})
          .populate({
            path: "reactions",
            select: "-__v",
          }).select("-__v")
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
            }).select("-__v")
            .then((dbThoughtData) =>  res.json(dbThoughtData )) 
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(400);
                });
        },
         createThought(req, res) {
            Thought.create(req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
        },
        
        updateThought(req, res) {
            Thought.findOneAndUpdate({ _id: req.params.id },
                 req.body, { 
                     new: true,
                      runValidators: true,
                     })
                     .then((dbThoughtData) => {
                        if (!dbThoughtData) {
                          res.status(404).json({ message: "Cannot find Thought with this Id!" });
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


                     addreaction({params, body }, res) {
                         Thought.findByIdAndUpdate(
                            params.id, 
                            { $push: { reactions: body.reactionId } },
                            { new: true, 
                                runValidators: true,
                            }).then((dbThoughtData) => res.json(dbThoughtData))
                            .catch((err) => res.status(400).json(err));
                    },
                    
                    removereaction({params, body }, res) {
                        Thought.findByIdAndUpdate(
                            params.id,
                            { $pull: { reactions: body.reactionId } },
                            { new: true,
                                runValidators: true,
                            })
                            .then((dbThoughtData) => res.json(dbThoughtData))
                            .catch((err) => res.status(400).json(err));
                    },
                };
