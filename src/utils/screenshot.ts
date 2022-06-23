import Jimp from 'jimp';
import robot, { screen } from 'robotjs';

export async function printScreen (
  x: number,
  y: number,
  width: number,
  height: number
): Promise<Jimp> {
  return new Promise((resolve) => {
    const bitmap = screen.capture(x, y, width, height)
    const image = new Jimp(width, height)

    let pos = 0

    image.scanQuiet (
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      (x, y, idx) => {
        image.bitmap.data[idx + 2] = bitmap.image.readUInt8(pos++)
        image.bitmap.data[idx + 1] = bitmap.image.readUInt8(pos++)
        image.bitmap.data[idx + 0] = bitmap.image.readUInt8(pos++)
        image.bitmap.data[idx + 3] = bitmap.image.readUInt8(pos++)
      }
    )
    resolve(image);
  });
}

export async function base64shot(x: number,
    y: number,
    width: number,
    height: number) {
  const mousePos = robot.getMousePos();
  const image = await printScreen((mousePos.x - width/2), (mousePos.y + height/2), width, height);
  const base64 = await image.getBase64Async(image.getMIME());
  return base64.substring(22);
}

export async function getImage(x: number, y: number, width: number, height: number): Promise<Jimp> {
  return new Promise((resolve) => {
   
    const mousePos = robot.getMousePos();
    const img = robot.screen.capture((x - width/2), (y + height/2), width, height).image;
    const image = new Jimp({data: img, width, height}, (err: any, image: Jimp | PromiseLike<Jimp>) => {
      if (err) {
        console.log(err);
      }
      resolve(image);
    });
  });
}

export async function displayImage(x: number, y: number, width: number, height: number) {
  const image = await getImage(x, y, width, height);
  const base64 = await image.getBase64Async(image.getMIME());
  console.log(`in displayImage base64 is ${base64}`);
  return base64.substring(22);
}

export async function makePrintScreen(x: number, y: number, width: number, height: number) {
  const mousePos = robot.getMousePos();
  const img = robot.screen.capture(x, y, width, height);
  const data = [];
  const bitmap = img.image;
  for (let i = 0; i < bitmap.length; i += 4){
    data.push(bitmap[i+2], bitmap[i+1], bitmap[i], bitmap[i+3]);
  }
  new Jimp({
    data: new Uint8Array(data),
    width: width,
    height: height
  }, async (err: any, image: Jimp) =>{
    if (err) {
      console.log(err)    
    } else {
      console.log(`width is ${image.bitmap.width}`);
      const base64 = await image.getBase64Async(image.getMIME());
      const buf = await base64.substring(22);
      console.log(`in makeScreen buf is ${buf}`);
      return buf;
    }
  });
}

// function getScreenshot() {
//   let red: number, green: number, blue: number;
//   pic.image.forEach((byte: number, i: number) => {
//     switch (i % 4) {
//       case 0:
//         return blue = byte;
//       case 1:
//         return green = byte;
//       case 2: 
//         return red = byte;
//       case 3:
//         image.bitmat.data[i - 3] = red;
//         image.bitmat.data[i - 2] = green;
//         image.bitmat.data[i - 1] = blue;
//         image.bitmat.data[i] = 255;
//     }
//   })
//   return image;
// }

// getScreenshot().write(path: 'screenshot.png');

// duplex.write(`prnt_scrn ${base64}`)
// только надо будет заменять 'data:image/png;base64,' на пустую строку
