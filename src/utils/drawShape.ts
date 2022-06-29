import { Duplex } from 'stream';
import { drawCircle } from './drawCicle';
import { drawRectangle } from './drawRectangle';

export function drawShape(duplex: Duplex, command: string, x: number, y: number, a: number, b=a) {
  duplex.write(`draw_${command} ${x},${y},${a}\0`);
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