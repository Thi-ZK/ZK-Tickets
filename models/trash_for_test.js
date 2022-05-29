const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trash_schema = new Schema({
    field1: {
        type: Object,
        required: true 
    },

    field2: {
        type: Array,
        required: true
    },

    field3: {
        type: String,
        required: true
    },

    field4: {
        type: Number,
        required: true
    }
});

const Trash = mongoose.model("Trash For Test", trash_schema);
module.exports = Trash;