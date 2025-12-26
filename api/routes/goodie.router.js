import express from 'express'
import * as goodieController from "../controller/goodie.controller.js";


let router = express.Router();

router.get("/",goodieController.getGoodies);
router.post("/",goodieController.addGoodies);
router.get("/colors",goodieController.getGoodiesColors);
router.get("/sizes",goodieController.getGoodiesSizes);
router.post("/colors",goodieController.addGoodiesColors);
router.post("/sizes",goodieController.addGoodiesSizes);

router.delete("/:idgoodie/colors",goodieController.removeGoodiesColors);
router.delete("/:idgoodie/sizes",goodieController.removeGoodiesSizes);

router.put("/:iduser",goodieController.editGoodies);
router.get("/:idprovider",goodieController.getGoodiesByProviderId);



export default router;
