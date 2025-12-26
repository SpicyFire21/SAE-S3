import express from 'express'
import * as autographsController from "../controller/autographs.controller.js";


let router = express.Router();

router.get("/",autographsController.getAutographs);
router.get("/:id",autographsController.getAutographsById);
router.get("/:idstand",autographsController.getAutographsByStandId);




export default router;
