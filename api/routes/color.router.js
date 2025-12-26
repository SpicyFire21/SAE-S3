import express from 'express'
import * as colorController from "../controller/color.controller.js";


let router = express.Router();

router.get("/",colorController.getColors);
router.post("/",colorController.addColor);



export default router;
