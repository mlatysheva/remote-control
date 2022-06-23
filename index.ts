import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';
import { getScreenshot, showImage } from './src/utils/screenshot';
import { drawRectangle } from './src/utils/drawRectangle';
import { drawCircle } from './src/utils/drawCicle';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8080,
});

// const ws = new WebSocket('ws:localhost:8080');

wss.on('connection', ws => {
  ws.on('message', async (data) => {
    
    const { x, y } = robot.getMousePos();
    console.log('received: %s', data);
    const [ command, ...args ] = data.toString().split(' ');
    const [a, b] = args.map((arg) => parseInt(arg));
    switch (command) {
      case ('mouse_up'): {
        robot.moveMouse(x, y - a);
        break;
      };
      case ('mouse_down'): {
        robot.moveMouse(x, y + a);
        break;
      };
      case ('mouse_left'): {
        robot.moveMouse(x - a, y);
        break;
      };
      case ('mouse_right'): {
        robot.moveMouse(x + a, y);
        break;
      };
      case ('mouse_position'): {
        ws.send(`mouse_position ${x},${y}`);
        break;
      };
      case ('draw_square'): {
        ws.send(`draw_square ${x},${y} ${a}`);
        drawRectangle(x, y, a, a);
        break;
      };
      case ('draw_rectangle'): {
        ws.send(`draw_rectangle ${x},${y},${a},${b}`);
        drawRectangle(x, y, a, b);
        break;
      };
      case ('draw_circle'): {
        ws.send(`draw_circle ${x},${y},${a}`);
        console.log(`draw_circle ${x},${y},${a}`);
        drawCircle(a);
        break;
      };
      case ('prnt_scrn'): {    
        const buf = await showImage(x, y, 200, 200);
        getScreenshot(x, y, 200, 200);
        ws.send(`prnt_scrn ${buf}`);
        break;
      }; 
    }
  });
  ws.on('close', () => { console.log(`WebSocket closed`); });
});

wss.on('close', () => {
  console.log(`WebSocketServer closed`);
}); 
