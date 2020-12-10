const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const userRouter = require('./user/userRouter')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/user', userRouter)

server.get('/', (req, res) => {
    res.status(200).json({mes: "HI, from the backend"});
});

module.exports = server;