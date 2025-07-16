const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to MongoDB...')

mongoose
  .connect(config.mongoUrl)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connection to mongoDB', error.message))

app.use(express.json())

app.use('/api/blogs', blogRouter)


module.exports = app
