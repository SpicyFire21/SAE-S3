import express from 'express'
import * as sizeController from "../controller/size.controller.js";
import * as colorController from "../controller/color.controller.js";


let router = express.Router();

router.get("/",sizeController.getSizes);
router.post("/",sizeController.addSize);


export default router;
