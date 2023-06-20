const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/furnitures')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err.message));

app.use(routes);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());
app.use(auth);

// the first way (other - npm i cors)
// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', '*');

//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     next();
// });

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods',
//         'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers',
//         'Content-Type, Authorization');
//     next();
// });


app.listen(3030, () => console.log('RESTfull server is listening on port 3030...'))