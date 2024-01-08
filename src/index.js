import express from "express";
import cors from "cors";

import bodyParser from "body-parser";

import { ImageRouter } from "./apis/imageUploads/imageUploads.router.js";
import { initalServicesInit } from "./utilities/initialservices/initialServices.js";
initalServicesInit();
const app = express();

const port = 5000;
app.use(bodyParser.json());
app.use(cors());

//  routes

app.use("/image", ImageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
