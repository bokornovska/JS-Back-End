const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express();

app.use(routes);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// the first way (other - npm i cors)
// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', '*');

//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     next();
// });
app.use(cors());

app.listen(3030, () => console.log('RESTfull server is listening on port 3030...'))