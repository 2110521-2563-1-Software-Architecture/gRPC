const http2 = require('http2');
const fs = require('fs')
const httpsOptions = {
    key: fs.readFileSync('C:\\Users\\beebe\\Desktop\\Project_Year4\\gRPC\\rest-api\\key\\server.key'),
    cert: fs.readFileSync('C:\\Users\\beebe\\Desktop\\Project_Year4\\gRPC\\rest-api\\key\\server.crt'),
  };
// https is necessary otherwise browsers will not
// be able to connect
const server = http2.createSecureServer(httpsOptions, (req, res) => {
 res.end('Hello World!ss');
});
server.listen(3000);