const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const listWithOneBlog =  
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
     
    }
const initialBlogs = [ 
        { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
        { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }
    ]
beforeEach(async () => 
{  await Blog.deleteMany({})  
let blogObject = new Blog(initialBlogs[0])  
await blogObject.save()  
blogObject = new Blog(initialBlogs[1])  
await blogObject.save()})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
})
test('blog is posted', async () => {
    await api
    .post('/api/blogs')
    .send(listWithOneBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length+1)
    const contents = response.body[2].title
    expect(contents).toContain(
        'Go To Statement Considered Harmful'
    )
})
afterAll(() => {
  mongoose.connection.close()
})