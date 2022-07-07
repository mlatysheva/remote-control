import robot from 'robotjs';
import { Duplex } from 'stream';

export function moveMouse(duplex: Duplex, command: string, x: number, y: number) {
  robot.moveMouse(x, y);
  duplex.write(`mouse_${command} ${x}, ${y}\0`);
  console.log(`mouse_${command} to ${x}, ${y}`);
}