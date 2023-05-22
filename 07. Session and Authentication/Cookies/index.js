const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');

const dataService = require('./dataService');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my secret',
    resave: false,
    saveUnitialized: true,
    cookie: { secure: false }
}))

app.get('/', (req, res) => {
    res.send(`
    <h1>Hello from Homepage</h1>
    <p><a href="/login">Login</a></p>
    <p><a href="/register">Register</a></p>
    <p><a href="/profile">Profile</a></p>
    <p><a href="/logout">Logout</a></p>


    `);
})

app.get('/login', (req, res) => {
    res.send(`
    <h1>Log In</h1>
    <form method ="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />

    <label for="password"></label>
    <input type="password" id="password" name="password" />

    <input type="submit" value="login" />

</form>`);
});

app.get('/register', (req, res) => {
    res.send(`
    <h1>Sign Up</h1>
    <form method ="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />

    <label for="password"></label>
    <input type="password" id="password" name="password" />

    <input type="submit" value="register" />

</form>`)
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    await dataService.registerUser(username, password);

    res.redirect('/login');


})

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {
        const token = await dataService.loginUser(username, password);

        res.cookie('token', token, { httpOnly: true });

        // this is demo only
        // req.session.username = user.username;
        // req.session.privateInfo = user.password;

        return res.redirect('/')

    } catch (error) {
        console.log(error)
        res.status(401).end();
    }



});

app.get('/profile', (req, res) => {
    // check if user is logged?

    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).end();
    }

    try {
        const decodedToken = jwt.verify(token, "MySecret");

        console.log(decodedToken);

        res.send(`
    <h2>Hello ${decodedToken.username}</h2>
    `)
    } catch (error) {
        res.status(401).end();
    }



});

app.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
})
app.listen(5000, () => console.log('Server is listening on port 5000...'));