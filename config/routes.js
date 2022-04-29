const express = require('express');
const router = express.Router();

const upload = require('./storage.config');

const authMiddleware = require('../middlewares/auth.middleware');

const plantController = require('../controllers/plant.controller');
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const ordersController = require('../controllers/orders.controller');

router.get('/', (req, res, next) => {
  res.status(200).json({ ok: true });
});


/* Plant */
router.post('/plant/new', upload.single('image'), plantController.create);
router.get('/plant/:id', plantController.detail);
router.get('/plant', plantController.list);
router.patch('/plant/:id', upload.single('image'), plantController.update);
router.delete('/plant/:id', plantController.delete);


/* Auth */
router.post('/login', authMiddleware.isNotAuthenticated, authController.login);


/* Users */
router.post('/users', authController.create);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUserById);
router.post('/users/:userId/checkout', authMiddleware.isAuthenticated, usersController.checkout);


/* Orders */
router.get('/order', authMiddleware.isAuthenticated, ordersController.list)
router.get('/order/:id', authMiddleware.isAuthenticated, ordersController.detail) //¿Tengo que traer userController aquí?

module.exports = router;

