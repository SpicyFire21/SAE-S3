import express from 'express'
import * as providerController from "../controller/provider.controller.js";


let router = express.Router();

router.get("/",providerController.getProviders);
router.get("/requests",providerController.getProviderRequests);
router.post("/requests",providerController.addProviderRequests);
router.delete("/requests",providerController.deleteProviderRequests);



export default router;
