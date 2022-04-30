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
const { email, password } = req.body; //aquí nos traemos email y password para validar

const throwException = () => next(createError(401, 'Invalid credentials'));

if (!email || !password) {
    return throwException()
};

User.findOne({ email })
.then((user) => {
    if (!user) {
        throwException()
    } else {
        //aquí se compara el password con el método checkpassword que traes del User.model
        return user.checkPassword(password) 
        .then(match => {
            if (!match) {
                throwException()
            } else {
                res.json({
                    //aquí la movida del jwt
                    access_token: jwt.sign(
                        {
                            id: user.id
                        },

                        process.env.JWT_SECRET || 'mysecret',
                        {
                            expiresIn: '72h'
                        }
                    )
                })
            }
        })
    }
})
.catch
};