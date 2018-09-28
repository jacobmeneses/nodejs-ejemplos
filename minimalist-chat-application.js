const webSocketServer = require('ws').Server;

// static file server
const server = require('http').createServer( require('ecstatic')({ root: `${__dirname}/www` }) );

const wss = new webSocketServer({ server: server });

wss.on('connection', (ws) => { 
  console.log('Client connected');
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    broadcast(msg);
  });
});

function broadcast(msg) {
  wss.clients.forEach( client => {
      console.log('Sending to client');
      client.send(msg);
  });
}

server.listen(process.argv[2] || 8079 );
