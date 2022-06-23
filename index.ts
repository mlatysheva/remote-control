import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';
import { printScreen, base64shot, makePrintScreen, displayImage } from './src/utils/screenshot';
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
    console.log(`command is ${command}`);
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
        const buf = await base64shot(x, y, 200, 200);
        // const buf = await makePrintScreen(x, y, 200, 200);
        // const buf = await displayImage(x, y, 200, 200);
        console.log(`in prnt_scrn buf is ${buf}`);
        ws.send(`prnt_scrn ${buf}`);
        break;
      }; 
    }
  });
  ws.on('close', () => {});
});


wss.on('close', () => {

}); 

// duplex.push()
// (x – a)2 + (y – b)2 = r2
// const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

// duplex.pipe(process.stdout);
// process.stdin.pipe(duplex);