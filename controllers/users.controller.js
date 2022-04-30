const createError = require('http-errors');
const Stripe = require('stripe');
const User = require('../models/User.model');
const Order = require('../models/Order.Model');

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
      if (!user) {
        // not found
        next(createError(404, 'User not found'))
      } else {
        res.status(200).json(user)
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .populate({path: 'plants', options:{ sort: [{'plants': 'desc'}] }})
    .sort({ plants: 'desc' })
    .then(user => {
      if (!user) {
        // not found
        next(createError(404, 'User not found'))
      } else {
        res.status(200).json(user)
      }
    })
    .catch(next)
} 

module.exports.checkout = (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY)

  const { user, items, totalCart, amount, paymentType, paymentId } = req.body

  stripe.paymentIntents.create({
    amount,
    currency: "EUR",
    description: "shopping cart",
    payment_method: paymentId,
    confirm: true
   })
   .then(result => {
    res.status(200).json('payment confirmed')
     return Order.create({  user: req.currentUser, items, totalCart, amount, paymentType, paymentId })
     .then(order => {
       res.status(201).json({ message: "Order confirmed", result })
     })
   })

  .catch((error) => console.log(error))
}
