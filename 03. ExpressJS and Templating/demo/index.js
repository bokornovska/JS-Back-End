const express = require('express'); //imoprt express
const handlebars = require('express-handlebars');

const server = express(); //create server

server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars')

const loggerMiddleware = require('./loggerMiddleware');

server.use(express.static('public'));
server.use(loggerMiddleware);

server.get('/', (req, res) => {
    res.render('home')
});

server.get('/old', (req, res) => {
    res.send(`
    <html>
        <head>
            <link rel="stylesheet" href="/css/style.css" />
        </head>
        <body>

            <h1>Hello from express!</H1>
            <a href="/cats">cats</a>
            <a href="/dogs">dogs</a>

        </body>
    </html>
    `);
});

server.get('/cats', (req, res) => {

    const cats = [
        { name: 'Navcho', breed: 'Persian', age: 7 },
        { name: 'Sisa', breed: 'Angora', age: 12 },
        { name: 'Zuza', breed: 'Street cat', age: 10 },
    ]

    res.render('cats', { cats });
});

server.get('/cats/1', (req, res) => {
    res.download('./cat.jpg')
});

server.get('/cats/2', (req, res) => {
    res.sendFile('./cat.jpg', { root: __dirname })
});

server.get('/cats/3', (req, res) => {
    res.attachment('./cat.jpg') //without end
});

let validateCatIdMiddleware = (req, res, next) => {
    let catId = Number(req.params.catId);

    if (!catId) {
        return res.send('<h1>Invalid catId</h1>')
        // return res.redirect('/404')
    }

    req.catId = catId;
    next();
};


server.get('/cats/:catId', validateCatIdMiddleware, (req, res) => {
    res.render('cat', { id: req.params.catId, isOdd: req.catId %2 !==0})
});

server.get('/dogs', (req, res) => {
    res.render('dogs');
});

server.post('/cats', (req, res) => {

    res.send('cat recieved')
});

server.put('/cats', (req, res) => {
    res.send('cat is updated')
});

server.delete('/cats', (req, res) => {
    res.send('cat is deleted')
});

server.get('/json', (req, res) => {
    res.json({ ok: true, message: 'hello from json' })
});

server.get('/redirect', (req, res) => {
    res.redirect('/redirected')
});

server.get('/redirected', (req, res) => {
    res.send('<h1>This is redirectED page</H1>')
})

server.get('*', (req, res) => {
    res.send('404')
});





server.listen(5000, () => console.log('Server is listening on port 5000'));


