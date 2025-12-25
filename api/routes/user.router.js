import express from 'express'
import * as userController from "../controller/user.controller.js";


let router = express.Router();

router.get("/",userController.getUsers);

router.post("/login",userController.login);
router.post("/register",userController.addUser);


export default router;
