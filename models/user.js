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

    related_tickets: {
        required: true,
        type: Array
    },

    ticket_groups_related: {
        required: true,
        type: Array
    },

    password: {
        required: true,
        type: String
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;