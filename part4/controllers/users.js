const bcrypt = require ('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user.js')

userRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    
    })
    const savedUser = await user.save()
    response.json(savedUser)
})
userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url : 1})
    response.json(users)
})
module.exports = userRouter