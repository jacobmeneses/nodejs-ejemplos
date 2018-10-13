const webSocketServer = require('ws').Server;
const redis = require('redis');
const REDIS_PORT = '5445';
const redisOptions = {
  host: 'localhost',
  port: REDIS_PORT
};
const redisSub = redis.createClient(redisOptions);
const redisPub = redis.createClient(redisOptions);

// static file server
const server = require('http').createServer( require('ecstatic')({ root: `${__dirname}/www` }) );

const wss = new webSocketServer({ server: server });

wss.on('connection', (ws) => { 
  console.log('Client connected');
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    redisPub.publish('chat_messages', msg);
  });
});

redisSub.subscribe('chat_messages');
redisSub.on('message', (channel, msg) => {
  wss.clients.forEach( (client) => {
    client.send(msg);
  });
});

function broadcast(msg) {
  wss.clients.forEach( client => {
      console.log('Sending to client');
      client.send(msg);
  });
}

server.listen(process.argv[2] || 5447 );
