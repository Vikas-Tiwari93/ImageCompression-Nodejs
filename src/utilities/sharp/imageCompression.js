import sharp from "sharp";
import fs from "fs";
import tinify from "tinify";

tinify.key = "d9RLrl40J3v7nQGbwL6VNmp1C9PLsKN8";

export const compressionMobile = {
  quality: 6,
  progressive: true,
  compressionLevel: 9,
};

export const compressionTablet = {
  quality: 20,
  progressive: true,
  compressionLevel: 6,
};
export const compressionDektop = {
  quality: 50,
  progressive: true,
  compressionLevel: 2,
};

function filename(file) {
  return ` ${Date.now()}-${file.originalname.split(".")[0]}`;
}
// Compress and convert the image

export async function imageCompression(path, requestFile, compressionOptions) {
  try {
    let imageBuffer = await new Promise((resolve, reject) => {
      sharp(requestFile.buffer)
        .toFormat("webp")
        .webp(compressionOptions)
        .toBuffer((err, compressedBuffer) => {
          if (err) {
            reject(err);
          }
          resolve(compressedBuffer);
        });
    });
    return { imageBuffer, path, requestFile };
  } catch (err) {
    return err;
  }
}

export function uploadImage(compressedBufferArray) {
  let output = [];
  compressedBufferArray.forEach((element) => {
    const outputImagePath = `${element.path}/${filename(
      element.requestFile
    )}.webp`;

    output.push(outputImagePath);
    fs.writeFile(outputImagePath, element.imageBuffer, (err) => {
      if (err) {
        return err;
      }
    });
  });
  return output;
}