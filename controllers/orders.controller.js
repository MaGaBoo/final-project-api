const User = require('../models/User.model');
const Order = require('../models/Order.Model');

module.exports.detail = (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => res.status(200).json(order))
    .catch(next);
}

module.exports.list = (req, res, next) => {
  Order.find({ user: req.currentUser})
    .then((orders) => res.status(200).json(orders))
    .catch(next);
}

