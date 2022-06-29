import WebSocket, { createWebSocketStream } from "ws";
import { drawShape } from "./utils/drawShape";
import { moveMouse } from "./utils/moveMouse";
import { showImage } from "./utils/screenshot";
import robot from 'robotjs';

function connection(ws: WebSocket): void {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });
  
  duplex.on('data', async (data: Buffer) => {
    try {
      const [ command, ...args ] = data.toString().split(' ');
      const { x, y } = robot.getMousePos();
      console.log('received: %s', data);
      
      const [a, b] = args.map((arg) => parseInt(arg));
      switch (command) {
        case ('mouse_up'): {
          moveMouse(duplex, 'up', x, y - a);
          break;
        };
        case ('mouse_down'): {
          moveMouse(duplex, 'down', x, y + a);
          break;
        };
        case ('mouse_left'): {
          moveMouse(duplex, 'left', x - a, y);
          break;
        };
        case ('mouse_right'): {
          moveMouse(duplex, 'right', x + a, y);
          break;
        };
        case ('mouse_position'): {
          duplex.write(`mouse_position ${x},${y}\0`);
          console.log(`mouse_position ${x}, ${y}`);
          break;
        };
        case ('draw_square'): {
          drawShape(duplex, 'square', x, y, a);
          break;
        };
        case ('draw_rectangle'): {
          drawShape(duplex, 'rectangle', x, y, a, b);
          break;
        };
        case ('draw_circle'): {
          drawShape(duplex, 'circle', x, y, a);
          break;
        };
        case ('prnt_scrn'): {    
          const buf = await showImage(x, y, 200, 200);
          console.log(`print_scrn ${x}, ${y}, 200`);
          duplex.write(`prnt_scrn ${buf}\0`);
          break;
        };
        default: {
          console.log(`Command ${command} not found`);
        } 
      }
      console.log(`Received: ${data.toString()}`);
    } catch (err) {
      console.error(err);
    }
  });
  ws.on('close', () => { 
    duplex.destroy();
    console.log(`WebSocket closed`);
  });
}

export { connection };