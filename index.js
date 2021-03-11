require('dotenv').config()
const server = require('./api/server');
const express = require('express')
const path = require('path')

server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/build')))

server.use('*', (req, res) => {
    res.send(path.join(__dirname, 'client/build', 'index.html'))
})

let colors = require('colors'); // eslint-disable-line

// on Heroku machine, an env variable is called "NODE_ENV" -> "production"
if (process.env.NODE_ENV === 'development') { 
    const cors = require('cors')
    server.use(cors())
}

// catch-all that just sends back 
server.use('*', (req, res) => {
    res.send(path.join(__dirname, 'client/build', 'index.html'))
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`.cyan)
})