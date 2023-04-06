const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    });

    switch (req.url) {
        case '/': res.write('<h1>Hello from node.js</h1>');
            break;
        case '/cats': res.write('Some cats here');
            break;
        default: res.write('Samething else')
            break;
    }
    console.log('HTTP request') // prints in terminal not in browser
    console.log(req.method);
    console.log(req.url);

    res.end();
})

server.listen(5000);

console.log('Server is running on port 5000...')