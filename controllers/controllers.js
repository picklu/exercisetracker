const dns = require('dns');
const shortid = require('shortid');
const users = require('../models/users');
const exercises = require('../models/exercises');

exports.addUser = function (req, res, next) {
    const query = { username: req.body.username };
    users.findOne(query, function (error, data) {
        if (error) {
            res.json(error)
        } else if (data) {
            res.status(500)
                .type('text')
                .send('username already taken!');
        } else {
            query._id = shortid.generate();
            users.create(query, function (error, data) {
                if (error) {
                    res.json({ error })
                } else if (data) {
                    res.json(query);
                } else {
                    res.json({ error: 'Something went wrong!' })
                }
            })
        }
    })
}

exports.addExercise = function (req, res, next) {
    res.json({ _id: ids.generate() });
}