const Router = require('express').Router;
const controllers = require('../controllers/controllers');


const router = new Router();


// shorten url
router.route('/new-user').post(controllers.addUser);
router.route('/add').post(controllers.addExercise);




module.exports = router;