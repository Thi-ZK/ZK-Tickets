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

    assumers: {
        required: true,
        type: Array
    },
    
    assumers_names: {
        required: true,
        type: Array
    },

    related_users: {
        required: true,
        type: Array
    },

    related_users_names: {
        required: true,
        type: Array
    },

    groups: {
        required: true,
        type: Array
    },

    groups_names: {
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

    creator: {
        required: true,
        type: String // user name
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
    },

    last_status_update_date: {
        required: true,
        type: String
    }
}, {timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;