/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var storage = [];


var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'json';
  console.log(request.url);
  if (request.url === '/classes/messages') {
  // ================ POST METHOD ================
    if (request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end();
    } else if (request.method === 'POST') {
      console.log('POST');
      var body = '';
      request.on('data', function (data) {
        body += data;
        console.log('Partial body: ' + body);
      });
      request.on('end', function () {
        storage.push(JSON.parse(body));
        console.log('Body: ' + body);
      });
      response.writeHead(201, headers);
      response.end(JSON.stringify(body));
    } else if (request.method === 'GET') {
      // ================ GET METHOD ================
      console.log('GET');
      var json = JSON.stringify({
        method: request.method,
        url: request.url,
        results: storage
      });
      response.writeHead(200, headers);
      response.end(json);
    }
  } else {
    response.writeHead(404, headers);
    response.end('wtf');
  }
};

exports.requestHandler = requestHandler;
