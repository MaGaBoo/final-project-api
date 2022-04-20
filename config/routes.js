const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware')

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


/* Auth */
router.post('/login', authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.login)


/* Users */
router.post('/users', authController.create);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUserById)



module.exports = router;