const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, url } = request.body

    if (!title) {
        return response.status(400).json({
            error: 'title is required',
        })
    } 

    if (!url) {
        return response.status(400).json({
            error: 'url is required',
        })
    } 

    const blog = new Blog(request.body)

    const result = await blog.save()
    return response.status(201).json(result)
})

module.exports = blogsRouter