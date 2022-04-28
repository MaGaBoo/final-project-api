const User = require('../models/User.model');
const Order = require('../models/Order.Model');

module.exports.create = (req, res, next) => {

    let order = ({ user } = req.body);

    Order.create(order)
    .then((order) => res.status(200).json(order))
    .catch(next)
};

