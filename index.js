const server = require('./api/server');

let colors = require('colors');

// START YOUR SERVER HERE
server.listen(5000, () => {
    console.log('listening on port 5000'.cyan)
})