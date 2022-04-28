const User = require('../models/User.model');
const Order = require('../models/Order.Model');

module.exports.detail = (req, res, next) => {

    Order.findById(req.params.id)
    .then((order) => {
        res.status(200).json(order)
        console.log(order)
    
    })
    .catch(error => console.log(error))
}


