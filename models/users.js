const mongoose = require('mongoose');

// Schema for urls
const usersSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        required: [true, 'The short form of the url is required']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'The domain name is required']
    }
});

module.exports = mongoose.model('users', usersSchema);

