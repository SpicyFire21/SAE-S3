import express from 'express'
import * as standController from "../controller/stand.controller.js";


let router = express.Router();

router.get("/",standController.getStands);
router.get("/types",standController.getStandsTypes);
router.get("/types/:idtype",standController.getStandTypeById);
router.get("/:id",standController.getStandsById);




export default router;
