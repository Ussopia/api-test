let http = require('http');
let db = require('./db/punch.js')

let server = http.createServer();

	console.log('server api connected');
	
server.on('request', (request, response) => {
	response.writeHead(200, {
		'Content-type': 'text/html; charset=utf-8'
		
		});
	response.end(`{
\"link\": \"${db.punch()}\"
}
`);
  })
  
  server.listen(8080)
