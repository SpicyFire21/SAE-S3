import express from 'express'
import * as autographsController from "../controller/autographs.controller.js";


let router = express.Router();

/**
 * @swagger
 * /autographs:
 *   get:
 *     summary: Récupérer tous les autographes
 *     tags:
 *       - Autographs
 *     responses:
 *       200:
 *         description: Liste des autographes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autograph'
 *       500:
 *         description: Erreur serveur
 */
router.get("/",autographsController.getAutographs);

/**
 * @swagger
 * /autographs/{id}:
 *   get:
 *     summary: Récupérer un autographe par ID
 *     tags:
 *       - Autographs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l’autographe
 *     responses:
 *       200:
 *         description: Autographe trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autograph'
 *       404:
 *         description: Autographe non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id",autographsController.getAutographsById);

/**
 * @swagger
 * /autographs/stand/{idstand}:
 *   get:
 *     summary: Récupérer les autographes d’un stand
 *     tags:
 *       - Autographs
 *     parameters:
 *       - in: path
 *         name: idstand
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du stand
 *     responses:
 *       200:
 *         description: Liste des autographes du stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autograph'
 *       404:
 *         description: Aucun autographe trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/stand/:idstand",autographsController.getAutographsByStandId);




export default router;
