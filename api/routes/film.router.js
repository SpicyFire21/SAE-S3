import express from 'express'
import * as filmController from "../controller/film.controller.js";


let router = express.Router();

router.get("/",filmController.getFilms);
router.get("/:iddirector",filmController.getFilmDirector);




export default router;
