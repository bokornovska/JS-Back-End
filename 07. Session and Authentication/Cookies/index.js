const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

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
    <p><a href="/profile">Profile</a></p>

    `);
})

app.get('/login', (req, res) => {
    res.send(`<form method ="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />

    <label for="password"></label>
    <input type="password" id="password" name="password" />

    <input type="submit" value="login" />

</form>`);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username == 'Ivan' && password == 'V') {
        const data = {
            username: "Ivan",
            age: 25
        }

        res.cookie('auth', JSON.stringify(data));
        req.session.username = 'Ivan';
        req.session.privateInfo = 'Some private info';
        return res.redirect('/')
    }

    res.status(401).end();
});

app.get('/profile', (req, res) => {
    // check if user is logged?

    const authData = req.cookies['auth'];

    if (!authData) {
        return res.status(401).end();
    }

    const { username } = JSON.parse(authData);

    // console.log(username);
    console.log(req.session);

    res.send(`
    <h2>Hello ${username}</h2>
    `)

});

app.listen(5000, () => console.log('Server is listening on port 5000...'));