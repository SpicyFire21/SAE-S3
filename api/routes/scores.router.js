import express from 'express'
import * as scoreController from "../controller/score.controller.js";

let router = express.Router();

/**
 * @swagger
 * /scores:
 *   get:
 *     summary: Récupérer tous les scores
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: Liste des scores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VotesScore'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", scoreController.getScores);




export default router;
