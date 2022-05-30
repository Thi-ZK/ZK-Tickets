const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    id: {
        required: true,
        type: Number
    },

    related_users: {
        required: true,
        type: Array
    },

    groups: {
        required: true,
        type: Array
    },

    description: {
        required: true,
        type: String
    },

    creator: {
        required: true,
        type: Number // user ID
    },

    status: {
        required: true,
        type: String
    },

    assumers: {
        required: true,
        type: Array
    },

    creation_date: {
        required: true,
        type: Date
    },

    due_date: {
       required: true,
       type: Date
    },

    priority: {
        required: true,
        type: String
    },

    attachments: {
        required: true,
        type: Array
    },

    messages: {
        required: true,
        type: Array
    }
});

const Ticket = mongoose.model("Tickets", ticketSchema);
module.exports = Ticket;