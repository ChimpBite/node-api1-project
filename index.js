require('dotenv').config()
const server = require('./api/server');

let colors = require('colors'); // eslint-disable-line

// on Heroku machine, an env variable is called "NODE_ENV" -> "production"
if (process.env.NODE_ENV === 'development') { 
    const cors = require('cors')
    server.use(cors())
}

// catch-all that just sends back 
server.use('*', (req, res) => {
    res.send({ message: 'Connected'})
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`.cyan)
})