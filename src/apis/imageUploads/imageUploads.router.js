import express from "express";
import { CompressController } from "./imageUploads.controller.js";
import { upload } from "../../utilities/multer/flieStorage.js";

export const ImageRouter = express.Router();
ImageRouter.post("/upload", upload.single("newImage"), CompressController);
