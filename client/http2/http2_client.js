const http2 = require('http2')
http2.get('https://localhost:3000/', function(response) {
  response.pipe(process.stdout);
});