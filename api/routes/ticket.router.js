import express from 'express'
import * as ticketController from "../controller/ticket.controller.js";


let router = express.Router();

router.post("/",ticketController.createTicket);
router.get("/prices",ticketController.getTicketsPrice);
router.get("/:iduser",ticketController.getBilletsByUserId);






export default router;
