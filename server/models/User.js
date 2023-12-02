// server/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},

    roles: {
        type: [String],
        enum: ['user', 'admin'],
        default: ['user']

    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;