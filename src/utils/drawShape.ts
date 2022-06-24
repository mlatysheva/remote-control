import { drawCircle } from './drawCicle';
import { drawRectangle } from './drawRectangle';

export function drawShape(ws: { send: (arg0: string) => void; }, command: string, x: number, y: number, a: number, b=a) {
  ws.send(`draw_${command} ${x},${y},${a}\0`);
  switch(command) {
    case 'square': {
      drawRectangle(x, y, a, a);
      break;
    }
    case 'rectangle': {
      drawRectangle(x, y, a, b);
      break;
    }
    case 'circle': {
      drawCircle(a);
      break;
    } 
  }
  console.log(`draw_${command} ${x}, ${y}, ${a}`);
}