const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

 const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: Types.ObjectId,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: [280, "Thought must be less than 280 characters"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username:{
            type: String,
            required: true,
        },
        reactions: [reactionSchema], 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);



ThoughtSchema.virtual("createdAtFormatted").get(function () {
   return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;