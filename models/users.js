var mongoose = require('mongoose');

// Schema for urls
var usersSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: [true, 'The short form of the url is required']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'The domain name is required']
    },
    count: {
        type: Number,
        default: function () {
            return this.log.length;
        }
    },
    log: [
        { type: Schema.Types.ObjectId, ref: 'exercise' }
    ]
});

module.exports = mongoose.model('users', usersSchema);
