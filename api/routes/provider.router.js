import express from 'express'
import * as providerController from "../controller/provider.controller.js";


let router = express.Router();

router.get("/",providerController.getProviders);



export default router;
