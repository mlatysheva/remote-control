import robot from 'robotjs';

export function moveMouse(ws: { send: (arg0: string) => void; }, command: string, x: number, y: number) {
  robot.moveMouse(x, y);
  ws.send(`mouse_${command} ${x}, ${y}\0`);
  console.log(`mouse_${command} to ${x}, ${y}`);
}