const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
    test('correct number of blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, initialBlogs.length)
    })
})

describe('blog identifier', () => {
    test('blogs have id property instead of _id', async () => {
        const response = await api.get('/api/blogs')

        const blog = response.body[0]

        assert.ok(blog.id)
        assert.strictEqual(blog._id, undefined)
    })
})

describe('POST /api/blogs', () => {
    test('a new blog can be added', async () => {
        const newBlog = {
            title: 'New test blog',
            author: 'dev',
            url: 'http://example.com/',
            likes: 7,
        }

        const blogsBefore = await Blog.find({})
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await Blog.find({})
        assert.strictEqual(blogsBefore.length + 1, blogsAfter.length)

        const response = await api.get('/api/blogs')

        const savedBlog = response.body.at(-1)

        assert.strictEqual(savedBlog.title, newBlog.title)
        assert.strictEqual(savedBlog.author, newBlog.author)
        assert.strictEqual(savedBlog.url, newBlog.url)
        assert.strictEqual(savedBlog.likes, newBlog.likes)

    })
})

after(async () => {
    await mongoose.connection.close()
})