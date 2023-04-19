const express = require('express'); //imoprt express

const server = express(); //create server

server.get('/', (req, res) => {
    res.send('<h1>Hello from express!</H1>');
});

server.listen(5000, () => console.log('Server is listening on port 5000'));


