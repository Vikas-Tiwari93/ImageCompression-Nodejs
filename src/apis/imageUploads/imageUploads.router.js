import express from "express";
import {
  CompressController,
  ManualCompressController,
} from "./imageUploads.controller.js";
import { upload } from "../../utilities/multer/flieStorage.js";

export const ImageRouter = express.Router();
ImageRouter.post(
  "/upload/compress",
  upload.single("newImage"),
  CompressController
);
ImageRouter.get("/manual/compress", ManualCompressController);
