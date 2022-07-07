import robot from 'robotjs';

function drawLine(endX: number, endY: number, length: number, width = length, ) {
  const mousePos = robot.getMousePos();
  const startX = mousePos.x;
  const startY = mousePos.y;
  if (startY === endY) {
    if (startX < endX) {
      for (let i = 0; i <= length; i += 1) {
        const x = startX + i;
        robot.dragMouse(x, startY);
      }
    } else {
      for (let i = 0; i <= length; i += 1) {
        const x = startX - i;
        robot.dragMouse(x, startY);
      }
    }
  } else {
    if ( startY < endY ) {
      for (let i = 0; i <= width; i += 1) {
        const y = startY + i;
        robot.dragMouse(startX, y);
      }
    } else {
      for (let i = 0; i <= width; i += 1) {
        const y = startY - i;
        robot.dragMouse(startX, y);
      }
    }
  }
}

export function drawRectangle(x: number, y: number, width: number, length: number) {
  if (!length) {
    length = width;
  }
  robot.mouseToggle('down');
  drawLine(x + width, y, width, length);
  drawLine(x + width, y + length, width, length);
  drawLine(x, y + length, width, length);
  drawLine(x, y, width, length);
  robot.mouseToggle('up');
}
