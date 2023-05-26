const express = require('express');
const validator = require('validator');

// another way
// const expressValidator = require('express-validator');

const validators = require('./validators');
const { isEmail } = require('./middlewareValidator');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
    <h1>Hello from Homepage</h1>
    <p><a href="/login">Login</a></p>
    <p><a href="/register">Register</a></p>
    <p><a href="/profile">Profile</a></p>
    <p><a href="/logout">Logout</a></p>


    `);
});

app.get('/login', (req, res) => {
    res.send(`
    <h1>Log In</h1>
    <form method ="POST">
    <label for="username">Email</label>
    <input type="text" id="email" name="email" />

    <label for="password"></label>
    <input type="password" id="password" name="password" />

    <input type="submit" value="login" />

</form>`);
});

app.post('/login', isEmail, (req, res) => {
    const { email, password } = req.body;

    // first way
    // if(!/^\w{3,20}@\w{2,10}\.\w{2,10}$/.test(email)){
    //     return res.redirect('/404')
    // }

    // second way - function - validators.js
    // if (!validators.isEmail(email)) {
    //     return res.redirect('/404')
    // };

    // third way - with middleware

    console.log(password)
    if (!validator.isStrongPassword(password, { minLength: 5 })) {
        return res.redirect('/404');
    }


    res.redirect('/');
});

app.get('/404', (req, res) => {

    res.send(`
    <h1>Page not found</h1>
    `)
});

app.listen(5000, () => console.log('Server is listening on port 5000'));