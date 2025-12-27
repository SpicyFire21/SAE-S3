import express from 'express'
import * as colorController from "../controller/color.controller.js"

let router = express.Router()

/**
 * @swagger
 * /colors:
 *   get:
 *     summary: Récupérer toutes les couleurs
 *     tags:
 *       - Colors
 *     responses:
 *       200:
 *         description: Liste des couleurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Color'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", colorController.getColors)

/**
 * @swagger
 * /colors:
 *   post:
 *     summary: Ajouter une nouvelle couleur
 *     tags:
 *       - Colors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Color'
 *     responses:
 *       201:
 *         description: Couleur créée
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", colorController.addColor)

export default router
