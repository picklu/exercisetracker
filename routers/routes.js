const Router = require('express').Router;
const controllers = require('../controllers/controllers');


const router = new Router();


// shorten url
router.route('/new-user').post(controllers.addUser);
router.route('/add').post(controllers.addExercise);
router.route('/users').get(controllers.getUsers);
router.route('/log').get(controllers.getExercise);




module.exports = router;