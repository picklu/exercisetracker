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
    const userId = req.body.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date || undefined;

    if (!userId) {
        res.status(500)
            .type('text')
            .send('Unknown userid!');
    }
    else if (!description) {
        res.status(500)
            .type('text')
            .send('The field "description" is required!');
    }
    else if (!duration) {
        res.status(500)
            .type('text')
            .send('The field "duration" is required!');
    }
    else {
        users.findOne({ _id: userId }, function (error, data) {
            if (error) {
                res.json({ error })
            }
            else if (data) {
                const username = data.username;
                const _id = data._id;
                const query = { userId, description, duration, date };
                exercises.create(query, function (error, data) {
                    if (error) {
                        res.json({ error })
                    } else if (data) {
                        res.json({ username, _id, description, duration, date: data.date });
                    } else {
                        res.json({ error: 'Something went wrong!' })
                    }
                })
            }
            else {
                res.status(500)
                    .type('text')
                    .send('Unknown user_id!');
            }

        })


    }
}

exports.getUsers = function (req, res, next) {
    users.find({}, function (error, data) {
        if (error) {
            res.json(error)
        } else if (data) {
            res.json(data)
        }
    })
}


exports.getExercise = function (req, res, next) {
    const userId = req.query.userId;
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;

    if (!userId) {
        res.status(500)
            .type('text')
            .send('Unknown userid!');
    }
    else {
        const _id = userId;
        users.findOne({ _id }, { _id: false, username: true }, function (error, data) {
            if (error) {
                res.json({ error })
            }
            else if (data) {
                const username = data.username;
                const query = { userId, from, to, limit };
                const options = { _id: false, description: true, duration: true, date: true }
                exercises.find(query, options, function (error, data) {
                    if (error) {
                        res.json({ error })
                    } else if (data) {
                        const count = data.length;
                        res.json({ username, _id, count, log: data });
                    } else {
                        res.json({ error: 'Something went wrong!' })
                    }
                })
            }
            else {
                res.status(500)
                    .type('text')
                    .send('Unknown user_id!');
            }

        })
    }
}