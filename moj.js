// Require http header
var http = require('http');
 
// Create server
http.createServer(function (req, res) {

    // HTTP Status: 200 : OK
    // Content Type: text/html
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // Send the response body as &quot;Hello World!&quot;  
    res.end('Hellodgfdzugfdzsf World!');

}).listen(8000);
