const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
loginRouter.post('/', async (request, response ) => {
    body = request.body
    const user = await User.findOne({username : body.username})
    const passwordCorrect = user === null ? false : bcrypt.compare(body.password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error : 'invalid username or password'
        })
    }
    const userforToken = {
        username : user.username,
        id: user._id,
    }
    const token = jwt.sign(userforToken, process.env.SECRET)
    response
    .status(200)
    .send ({token, username: user.username, name : user.name})

})
module.exports = loginRouter