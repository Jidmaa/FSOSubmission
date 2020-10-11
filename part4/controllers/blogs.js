const BlogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
BlogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({})
response.json(blogs)
      
  })
  
  BlogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  
   result = await blog.save()
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