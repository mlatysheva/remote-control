import Jimp from 'jimp';
import { buffer } from 'stream/consumers';

export function screenshot(x: number, y: number, width: number, height: number) {
  return new Promise((resolve, reject) => {
    (buffer: string) => {
      Jimp.read(buffer, (err, image) => {
        if (err) {
          reject(err);
        }
        resolve(image);
      }
      );
    };
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
