import Jimp from 'jimp';
import robot from 'robotjs';

export function getScreenshot(x: number, y: number, width: number, height: number) {
  try {
    const img = robot.screen.capture((x - width/2), (y - width/2) , width, height);
    const screenshot = new Jimp({
      data: img.image,
      width: img.width,
      height: img.height
    }, (err: any, image: Jimp) =>{
      if (err) {
        console.error(err);
      } else {
        image.write("./screen.png");
      }
    });    
    return screenshot;
  } catch (error) {
    console.error(error);
  }
}

export async function showImage (x: number, y: number, width: number, height: number) {
  try {
    const image = await getScreenshot(x, y, width, height);
    if (image) {
      const base64 = await image.getBase64Async(image.getMIME());
      return base64.substring(22);
    }
  } catch (error) {
    console.error(error);
  }  
}
