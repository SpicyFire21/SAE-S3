import express from 'express'
import * as sizeController from "../controller/size.controller.js"
import {verifyRole, verifyToken} from "../middlewares/jwt.middleware.js";

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
 *     security:
 *       - bearerAuth: []
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
router.post("/",[verifyToken,verifyRole([1,2])], sizeController.addSize)

export default router
