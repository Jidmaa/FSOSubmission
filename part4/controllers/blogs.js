const BlogRouter = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
BlogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})
response.json(blogs)
      
  })
  
  BlogRouter.post('/', async (request, response) => {
      const body = request.body
      const user = await User.findById(body.userId) 
       
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