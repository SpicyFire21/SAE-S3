import express from 'express'
import * as basketController from "../controller/basket.controller.js";


let router = express.Router();

router.get("/items",basketController.getAllBasketItems);
router.post("/items",basketController.addBasketItems)
router.get("/current/:iduser",basketController.getBasketByUserId);
router.get("/:idbasket/items",basketController.getBasketItems);
router.get("/:iduser",basketController.getAllBasketByUserId);
router.patch("/:idbasket",basketController.payOrder)




export default router;
