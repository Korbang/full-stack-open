const config = require('./utils/config')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const logger = require('./utils/logger')

const app = express()

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.use((request, response)=> {
  response.status(404).json({ error: 'unknown endpoint' })
})

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

module.exports = app