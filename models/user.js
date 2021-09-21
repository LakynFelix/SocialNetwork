const {schema, model } = require('mongoose');

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please Enter Valid Email Address',
        ],
    },
    thoughts: [{
        type: schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
      id: false,
    }
);

userSchema.virtual('thoughtsCount').get(function() {
    return this.thoughts.length;
});

const User = model('User', userSchema);

module.exports = User;