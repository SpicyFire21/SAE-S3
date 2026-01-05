import express from 'express'
import * as voteController from "../controller/vote.controller.js";

let router = express.Router();


/**
 * @swagger
 * /votes:
 *   get:
 *     summary: Récupérer tous les votes
 *     tags:
 *       - Votes
 *     responses:
 *       200:
 *         description: Liste des votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vote'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", voteController.getVotes);

/**
 * @swagger
 * /votes/{id}:
 *   get:
 *     summary: Récupérer un vote par ID
 *     tags:
 *       - Votes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du vote
 *     responses:
 *       200:
 *         description: Vote trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vote'
 *       404:
 *         description: Vote non trouvé
 */
router.get("/:id", voteController.getVotesById);

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: Ajouter un vote
 *     tags:
 *       - Votes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoteInput'
 *     responses:
 *       201:
 *         description: Vote créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vote'
 *       400:
 *         description: Données invalides
 *       409:
 *         description: L'utilisateur a déjà voté dans cette catégorie
 *       500:
 *         description: Erreur serveur
 */
router.post("/", voteController.addVote);

/**
 * @swagger
 * /votes/categories:
 *   post:
 *     summary: Ajouter une catégorie
 *     tags:
 *       - Votes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoteCategoryInput'
 *     responses:
 *       201:
 *         description: Catégorie créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VotesCategory'
 *       400:
 *         description: Données invalides
 *       409:
 *         description: L'utilisateur a déjà voté dans cette catégorie
 *       500:
 *         description: Erreur serveur
 */
router.post("/categories",voteController.addCategory);

/**
 * @swagger
 * /votes/categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie par id
 *     tags:
 *       - Votes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie supprimé
 *       400:
 *         description: Donnée manquante
 *       404:
 *         description: Catégorie non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/categories/:id",voteController.deleteCategory);

/**
 * @swagger
 * /votes/scores:
 *   delete:
 *     summary: Supprimer tous les scores
 *     tags:
 *       - Votes
 *     responses:
 *       204:
 *         description: scores supprimés
 *       500:
 *         description: Erreur serveur
 */
router.delete("/scores",voteController.deleteAllScores);

/**
 * @swagger
 * /votes:
 *   delete:
 *     summary: Supprimer tous les votes
 *     tags:
 *       - Votes
 *     responses:
 *       204:
 *         description: votes supprimés
 *       500:
 *         description: Erreur serveur
 */
router.delete("/",voteController.deleteAllVotes);

/**
 * @swagger
 * /votes:
 *   put:
 *     summary: Modifier le score d'un vote existant ou créer la ligne si elle n'existe pas
 *     tags:
 *       - Votes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoteScoreInput'
 *     responses:
 *       200:
 *         description: Vote modifié ou créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vote'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.put("/", voteController.editVote);

/**
 * @swagger
 * /votes/{iduser}/{idcategory}:
 *   delete:
 *     summary: Supprimer un vote par utilisateur et catégorie
 *     tags:
 *       - Votes
 *     parameters:
 *       - in: path
 *         name: iduser
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: idcategory
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Vote supprimé
 *       404:
 *         description: Vote non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:iduser/:idcategory", voteController.deleteVote);

export default router;
