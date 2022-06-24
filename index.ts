import { httpServer } from './src/http_server/index';
import dotenv from 'dotenv';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import { showImage } from './src/utils/screenshot';
import { resolve } from 'path';
import { cwd } from 'process';
import { moveMouse } from './src/utils/moveMouse';
import { drawShape } from './src/utils/drawShape';

dotenv.config({ path: resolve(cwd(), '.env') })

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const WSS_PORT = Number(process.env.WSS_PORT) || 8080;

console.log(`Start static http server on ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: WSS_PORT,
});

console.log(`Websocket server is running on ${WSS_PORT} port.`);

wss.on('connection', ws => {
  ws.on('message', async (data) => {
    
    const { x, y } = robot.getMousePos();
    console.log('received: %s', data);
    const [ command, ...args ] = data.toString().split(' ');
    const [a, b] = args.map((arg) => parseInt(arg));
    switch (command) {
      case ('mouse_up'): {
        moveMouse(ws, 'up', x, y - a);
        break;
      };
      case ('mouse_down'): {
        moveMouse(ws, 'down', x, y + a);
        break;
      };
      case ('mouse_left'): {
        moveMouse(ws, 'left', x - a, y);
        break;
      };
      case ('mouse_right'): {
        moveMouse(ws, 'right', x + a, y);
        break;
      };
      case ('mouse_position'): {
        ws.send(`mouse_position ${x},${y}\0`);
        console.log(`mouse_position ${x}, ${y}`);
        break;
      };
      case ('draw_square'): {
        drawShape(ws, 'square', x, y, a);
        break;
      };
      case ('draw_rectangle'): {
        drawShape(ws, 'rectangle', x, y, a, b);
        break;
      };
      case ('draw_circle'): {
        drawShape(ws, 'circle', x, y, a);
        break;
      };
      case ('prnt_scrn'): {    
        const buf = await showImage(x, y, 200, 200);
        console.log(`print_scrn ${x}, ${y}, 200`);
        ws.send(`prnt_scrn ${buf}\0`);
        break;
      };
      default: {
        console.log(`Command ${command} not found`);
      } 
    }
  });
  ws.on('close', () => { console.log(`WebSocket closed`); });
});

wss.on('close', () => {
  console.log(`WebSocketServer closed`);
}); 
