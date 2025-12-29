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

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const result = await Blog.findByIdAndDelete(id)

    if (result === null) {
        return response.status(404).json({ error: 'person not found' })
    }

    return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const { title, author, url, likes } = request.body

    const blog = { title, author, url, likes }

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        blog,
        { new: true, runValidators: true }
    )

    if (!updatedBlog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    return response.json(updatedBlog)
})

module.exports = blogsRouter