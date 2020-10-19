const BlogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
BlogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})
response.json(blogs)
      
  })

const getTokenFrom = request =>  {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

BlogRouter.post('/', async (request, response) => {
    const body = request.body
    
    const token = getTokenFrom(request)
    const  decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error : 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id) 
    const blog = new Blog({
       url: body.url, 
       title: body.title,
       author: body.author,
       likes: body.likes,  
       user: user._id
   })
   
   result = await blog.save()
   user.blogs = user.blogs.concat(result._id)
   await user.save()
   response.status(201).json(result)
     
  })
  BlogRouter.delete('/:id', async (request, response) => {
     result = await Blog.deleteOne({_id: request.params.id})
     response.status(204).end()
  })
  BlogRouter.put('/:id', async (request, response) => {
      const body = request.body
      const blog = {
          likes : body.likes
      }
   const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
   response.json(updatedBlog)
  })
module.exports = BlogRouter