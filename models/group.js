const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    id: {
        required: true,
        type: Number
    },

    tickets: {
        required: true,
        type: Array
    },

    creator: {
        required: true,
        type: Number
    },

    creator_name: {
        required: true,
        type: String
    }
}, { timestamps: true });

const Group = mongoose.model("Ticket Group", groupSchema);
module.exports = Group;