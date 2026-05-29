require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const articleRoutes = require('./routes/articleRoutes')

const app = express()
const PORT = process.env.PORT || 8800

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'bitago-server' })
})

app.use('/api/users', userRoutes)
app.use('/api/articles', articleRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Server error.' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
