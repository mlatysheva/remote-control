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

// const socket = new WebSocket('ws:localhost:8080');

wss.on('connection', ws => {
  ws.on('message', data => {
    
    const { x, y } = robot.getMousePos();
    console.log('received: %s', data);
    const [ command, ...args ] = data.toString().split(' ');
    console.log(`command is ${command}`);
    const [a, b] = args.map((arg) => parseInt(arg));
    switch (command) {
      case ('mouse_up'): {
        console.log('mouse_up');
        robot.moveMouse(x, y - a);
        break;
      };
      case ('mouse_down'): {
        console.log('mouse_down');
        robot.moveMouse(x, y + a);
        break;
      };
      case ('mouse_left'): {
        console.log('mouse_left');
        robot.moveMouse(x - a, y);
        break;
      };
      case ('mouse_right'): {
        console.log('mouse_right');
        robot.moveMouse(x + a, y);
        break;
      };
      case ('mouse_position'): {
        ws.send(`mouse_position ${x},${y}`);
        break;
      };
      case ('draw_square'): {
        ws.send(`draw_square is requested with ${x}, ${y}, ${a}`);
        break;
      };
      case ('draw_rectangle'): {
        ws.send(`draw_square is requested with ${x}, ${y}, ${a}, ${b}`);
        break;
      };
      case ('draw_circle'): {
        ws.send(`draw_square is requested with ${x}, ${y}, ${a}`);
        break;
      };
      case ('prnt_scrn'): {
        ws.send(`prnt_scrn is requested with ${x},${y} and 200px`);
        break;
      };
    }
  });
  // const { x, y } = robot.getMousePos();
  // ws.send(`mouse_position ${x},${y}`);
});

wss.on('close', () => {

});

// duplex.push()
// (x – a)2 + (y – b)2 = r2