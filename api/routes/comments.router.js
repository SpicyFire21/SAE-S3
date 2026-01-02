import express from 'express'
import * as commentsController from "../controller/comments.controller.js";


let router = express.Router();

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupérer tous les commentaires du livre d'or
 *     tags: [CommentsGoldenBook]
 *     responses:
 *       200:
 *         description: Liste des commentaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentGoldenBook'
 *       500:
 *         description: Erreur serveur
 */
router.get("/",commentsController.getComments);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Ajouter un commentaire dans le livre d'or
 *     tags: [CommentsGoldenBook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentGoldenBookInput'
 *     responses:
 *       201:
 *         description: Commentaire créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentGoldenBook'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/",commentsController.addComments);


export default router;
