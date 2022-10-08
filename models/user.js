const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    id: {
        required: true,
        type: Number
    },

    email: {
        required: true,
        type: String
    },

    phone: {
        required: false,
        type: String
    },

    profession: {
        required: true,
        type: String
    },

    user_power: {
        required: true,
        type: Number
    },

    picture: {
        required: false,
        type: String // CHANGE LATER
    },

    password: {
        required: true,
        type: String
    },
    
    preferred_language: {
        required: true,
        type: String,
        default: "english"
    },

    preferred_brightness_theme: {
        required: true,
        type: String,
        default: "bright"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;