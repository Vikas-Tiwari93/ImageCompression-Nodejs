import {
  BAD_REQUEST,
  SERVER_ERROR,
  SUCCESS,
} from "../../utilities/constants/http-constants.js";
import { path } from "../../utilities/initialservices/initialServices.js";
import {
  compressionDektop,
  compressionMobile,
  compressionTablet,
  imageCompression,
  imageCompressionWithFilepath,
  imageInDirToArray,
  uploadImage,
} from "../../utilities/sharp/imageCompression.js";

export const CompressController = async (req, res) => {
  const newImage = req.file;

  try {
    if (newImage.mimetype !== "image/png") {
      return res.status(BAD_REQUEST).json({ message: "Not an ImageFile" });
    } else if (newImage) {
      let promises = [
        imageCompression(`${path}/mobile`, newImage, compressionMobile),
        imageCompression(`${path}/tablet`, newImage, compressionTablet),
        imageCompression(`${path}/desktop`, newImage, compressionDektop),
      ];

      let results = await Promise.all(promises);

      if (results.length === promises.length) {
        uploadImage(results);
        return res.status(SUCCESS).json({ message: "compression completed" });
      }
      return res
        .status(BAD_REQUEST)
        .json({ message: " Cant completed compression" });
    }

    return res.status(BAD_REQUEST).json({ message: "Invalid Request" });
  } catch (error) {
    console.log(error);
    res.status(SERVER_ERROR).json({ error });
  }
};

export const ManualCompressController = async (req, res) => {
  const imageExtension = req.query.extension;
  try {
    let imageArray = await imageInDirToArray(`${path}/uncompressed`);
    let isCompleted = false;

    for (let i = 0; i < imageArray.length; i++) {
      const Filepath = imageArray[i];

      console.log("inside image array");
      let promises = [
        imageCompressionWithFilepath(
          `${path}/mobile`,
          Filepath,
          compressionMobile,
          imageExtension
        ),
        imageCompressionWithFilepath(
          `${path}/tablet`,
          Filepath,
          compressionTablet,
          imageExtension
        ),
        imageCompressionWithFilepath(
          `${path}/desktop`,
          Filepath,
          compressionDektop,
          imageExtension
        ),
      ];

      let results = await Promise.all(promises);
      console.log("qwer", results);

      if (results.length === promises.length) {
        console.log("before upload img");
        uploadImage(results);
      }
      if (i === imageArray.length - 1) {
        return res.status(SUCCESS).json({ message: "compression completed" });
      } else {
        console.log("cant complete compression for" + Filepath);
      }
    }

    return res.status(BAD_REQUEST).json({ message: "Invalid Request" });
  } catch (error) {
    console.log(error);
    res.status(SERVER_ERROR).json({ error });
  }
};
