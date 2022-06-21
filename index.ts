import Jimp from 'jimp';
import {httpServer} from './src/http_server/index.js';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8080,
});

const socket = new WebSocket('ws:localhost:8080');

wss.on('connection', ws => {
  ws.on('message', data => {
    // data will contain mouse_position
    // we need to extract mouse position
    const { x, y } = robot.getMousePos();
    console.log('received: %s', data);
    ws.send(`mouse_position ${x},${y}`);
  });
  const { x, y } = robot.getMousePos();
  ws.send(`mouse_position is ${x},${y}`);
});

wss.on('close', () => {

});

// duplex.push()
// (x – a)2 + (y – b)2 = r2