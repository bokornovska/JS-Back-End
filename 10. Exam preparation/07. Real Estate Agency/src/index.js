const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');
const {errorHandler} = require('./middlewares/errorHandlerMiddleware')

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views')

// TODO check the paths
app.use('/static', express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);
// app.use(errorHandler); ???? in authController/register

// mongoose.set('strictQuery', false); //optional

// // TODO: Change database name
mongoose.connect(`mongodb://127.0.0.1:27017/agency`)
.then(() => console.log('DB connected successfully'))
.catch(err => console.log('DB error: ', err.message));


app.listen(3000, () => console.log('Server is running on port 3000...'));