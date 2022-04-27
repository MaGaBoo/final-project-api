const createError = require('http-errors');
const Stripe = require('stripe');
const User = require('../models/User.model');
const Order = require('../models/Order.Model')

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

  const { subUserId, amount, paymentId } = req.body
    console.log(req.body)

   //aquí Carlos mete la movida de already subscribed, que no necesitamos en este caso
  stripe.paymentIntents.create({
    amount,
    currency: "EUR",
    description: "carrito de la compra",
    payment_method: paymentId,
    confirm: true
   })
   .then(result => {
    console.log('stripe', result)
    res.status(200).json('payment confirmed')
  /*    return Order.create({  user: req.currentUser, targetUser: subUserId })
     .then(order => {
       console.log(order)
       res.status(201).json({ message: "Order confirmed", result })
     }) */
   })

  .catch((error) => console.log(error))
}