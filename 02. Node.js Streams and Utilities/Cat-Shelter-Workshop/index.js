const http = require('http');

const homePage = require('./views/index')
const siteCSS = require('./css/site.css.js')

const editCat = require('./views/editCat')
const cats = require('./views/cats.json')
const server = http.createServer((req, res) => {

    res.writeHead(200, {
        'content-type': 'text/html'
    });

    if (req.url == '/') {
        res.write(homePage);
    } else if (req.url == '/css/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css'
        });
        res.write(siteCSS)
    } else if(/cats\/\d+\/edit/.test(req.url)){
        let catId = req.url.split('/')[2];
        let cat = cats.find(x => x.id == catId);
        res.write(editCat(cat))
    }else if (req.url == '/css/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css'
        });
        res.write(siteCSS)
    }else {
        res.write(`
    <h1>404</h1>                
    `)
    }

    res.end();
});

server.listen(5000);
console.log('Server is running in port 5000...');
