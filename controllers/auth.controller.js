const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User.model');

module.exports.create = (req, res, next) => {
    User.create(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(next)
};

module.exports.login = (req, res, next) => {

//aquí nos traemos email y password para validar

const { email, password } = req.body;

const throwException = () => next(createError(401, 'Invalid credentials'));

if (!email || !password) {
    return throwException()
};

User.findOne({ email })
.then((user) => {
    if (!user) {
        throwException()
    } else {
        //aquí se compara el password con el método que traes del User.model
        return user.checkPassword(password) 
        .then(match => {
            if (!match) {
                throwException()
            } else {
                res.json({
                    //aquí la movida del jwt
                })
            }
        })
    }
})
};