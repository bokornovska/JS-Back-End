const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('hello world');
});

app.listen(3030, () => console.log('RESTfull server is listening on port 3030...'))