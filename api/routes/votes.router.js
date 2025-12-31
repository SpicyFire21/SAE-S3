import express from 'express'
import * as voteController from "../controller/vote.controller.js";

let router = express.Router();


router.get("/", voteController.getVotes);

router.post("/", voteController.addVote);

router.delete("/:id", voteController.deleteVote);

export default router;
