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
  uploadImage,
} from "../../utilities/sharp/imageCompression.js";

export const CompressController = async (req, res) => {
  const newImage = req.file;

  try {
    if (newImage) {
      let promises = [
        imageCompression(`${path}/desktop`, newImage, compressionMobile),
        imageCompression(`${path}/tablet`, newImage, compressionTablet),
        imageCompression(`${path}/mobile`, newImage, compressionDektop),
      ];

      let results = await Promise.all(promises);

      if (results.length === promises.length) {
        console.log(results);
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
