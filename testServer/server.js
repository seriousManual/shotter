var http = require('http');

http.createServer(function (req, res) {
    var colors = ['red', 'blue', 'green', 'yellow'];

    var time = (new Date()).toISOString();
    var borderColor = colors[parseInt(Math.random() * colors.length, 10)];
    var bgColor = colors[parseInt(Math.random() * colors.length, 10)];

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
        <html>
            <head></head>
            <body style="background-color:#fff">
                <h1 style="border:1px solid ` + borderColor + `;padding:20px;width:500px;text-align:center;font-size:40px;margin:50px auto">` + time + `</h1>
            </body>
        </html>
    `);
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');