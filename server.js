const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRoutes = require('./routes/user-routes.js');
const authRoutes = require('./routes/auth-routes.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use('/api/users', userRoutes)
server.use('/api/auth', authRoutes)

server.get('/', (req, res) => {
    res.status(200).json({message: 'Its alive'})
})

module.exports = server
