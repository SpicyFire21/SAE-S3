import express from 'express'
import * as projectionController from "../controller/projection.controller.js";


let router = express.Router();

router.get("/",projectionController.getProjections);





export default router;
