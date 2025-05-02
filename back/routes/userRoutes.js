const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const swipesController = require('../controllers/swipesController');
const matchesController = require('../controllers/matchesController');


router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/like', swipesController.saveLike);
router.post('/:id/dislike', swipesController.saveDislike);
router.get('/:id/matches', matchesController.getMatches);


module.exports = router;
