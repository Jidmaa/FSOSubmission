const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')

const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blogs') 
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
app.use(cors())
app.use(express.json())

app.use('/api/blogs', BlogRouter)
module.exports = app 