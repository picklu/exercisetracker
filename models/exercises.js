const mongoose = require('mongoose');

// Schema for urls
const exerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Field "userId" is required']
    },
    description: {
        type: String,
        required: [true, 'Field "description" is required']
    },
    duration: {
        type: Number,
        required: [true, 'Field "duration" of the exercise is required']
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('exercises', exerciseSchema);

