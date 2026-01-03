import express from 'express'
import * as categoryController from "../controller/categories.controller.js";

let router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer tous les categories
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: Liste des categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VotesCategory'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", categoryController.getCategories);




export default router;
