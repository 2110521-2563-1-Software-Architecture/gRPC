var spdy = require('spdy');
var https = require('https');

var agent = spdy.createAgent({
  host: 'localhost',
  port: 3000,

  // Optional SPDY options
  spdy: {
    plain: false,
    ssl: true,

    // **optional** send X_FORWARDED_FOR
    'x-forwarded-for': '127.0.0.1'
  }
}).once('error', function (err) {
    this.emit(err);
});

https.get({
  host: 'localhost',
  agent: agent
}, function(response) {
  console.log('yikes');
  // Here it goes like with any other node.js HTTP request
  // ...
  // And once we're done - we may close TCP connection to server
  // NOTE: All non-closed requests will die!
  agent.close();
}).end();