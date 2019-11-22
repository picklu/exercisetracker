const mongoose = require('mongoose');

// Schema for urls
const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    duration: {
        type: Number,
        required: [true, 'The duration of the exercise is required']
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('exercises', exerciseSchema);

