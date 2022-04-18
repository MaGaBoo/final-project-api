const express = require('express');
const router = express.Router();

const plantController = require('../controllers/plant.controller');
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

router.get('/', (req, res, next) => {
    console.log('holi, soy la home');
    res.status(200).json({ ok: true });
});


/* Plant */
router.post('/plant/new', plantController.create);
router.get('/plant/:id', plantController.detail);
router.patch('/plant/:id', plantController.update);
router.delete('/plant/:id', plantController.delete);

/* Users */

router.post('/users', authController.create);
router.get('/users/:id', usersController.getUserById)


module.exports = router;