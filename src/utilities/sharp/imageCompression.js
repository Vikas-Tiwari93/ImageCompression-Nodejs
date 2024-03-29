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
  quality: 30,
  progressive: true,
  compressionLevel: 4,
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
    return { imageBuffer, path, requestFile, imageExtension: "webp" };
  } catch (err) {
    return err;
  }
}
export async function imageCompressionWithFilepath(
  outputPath,
  requestFilePath,
  compressionOptions,
  imageExtension = "webp"
) {
  try {
    let imageBuffer = await new Promise((resolve, reject) => {
      let pipeline = sharp(requestFilePath).toFormat(`${imageExtension}`);

      switch (imageExtension) {
        case "webp":
          pipeline = pipeline.webp(compressionOptions);
          break;
        case "heif":
          pipeline = pipeline.heif(compressionOptions);
          break;
        case "avif":
          pipeline = pipeline.avif(compressionOptions);
          break;
      }

      pipeline = pipeline.toBuffer((err, compressedBuffer) => {
        if (err) {
          reject(err);
        }
        resolve(compressedBuffer);
      });
    });
    let requestFile = {};
    let nameArr = requestFilePath.split("/");
    requestFile.originalname = nameArr[nameArr.length - 1];
    return { imageBuffer, outputPath, requestFile, imageExtension };
  } catch (err) {
    console.log(err);
    return err;
  }
}

export function uploadImage(compressedBufferArray) {
  let output = [];

  compressedBufferArray.forEach((element) => {
    const outputImagePath = `${element.outputPath}/${filename(
      element.requestFile
    )}.${element.imageExtension}`;

    output.push(outputImagePath);
    fs.writeFile(outputImagePath, element.imageBuffer, (err) => {
      if (err) {
        return err;
      }
    });
  });
  return output;
}

export async function imageInDirToArray(inputDirectory) {
  return await new Promise((res, rej) => {
    fs.readdir(inputDirectory, (err, files) => {
      if (err) {
        rej(err);
      }
      let imageArray = files
        .filter((file) => {
          return /\.(jpg|jpeg|png|gif)$/i.test(file);
        })
        .map((file) => `${inputDirectory}/${file}`);

      res(imageArray);
    });
  });
}
