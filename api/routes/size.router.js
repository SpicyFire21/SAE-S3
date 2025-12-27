import express from 'express'
import * as sizeController from "../controller/size.controller.js"

let router = express.Router()

/**
 * @swagger
 * /sizes:
 *   get:
 *     summary: Récupérer toutes les tailles
 *     tags:
 *       - Sizes
 *     responses:
 *       200:
 *         description: Liste des tailles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Size'
 */
router.get("/", sizeController.getSizes)

/**
 * @swagger
 * /sizes:
 *   post:
 *     summary: Ajouter une taille
 *     tags:
 *       - Sizes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SizeInput'
 *     responses:
 *       201:
 *         description: Taille créée
 */
router.post("/", sizeController.addSize)

export default router
