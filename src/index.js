const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

mongoose.connect('mongodb://usuario:admin123@ds159574.mlab.com:59574/omnigram', {
    useNewUrlParser: true
})

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

const port = process.env.PORT || 5000

console.log(`The magic happens on port ${port}`)

server.listen(port)
