import robot from 'robotjs';

export function drawCircle(r: number) {
  let mousePos = robot.getMousePos();
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mousePos.x - (r * Math.cos(i)) + r;
    const y = mousePos.y - (r * Math.sin(i));    
    robot.dragMouse(x, y);
  };
  mousePos = robot.getMousePos();
}