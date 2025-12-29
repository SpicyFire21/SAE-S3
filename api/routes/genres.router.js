import express from 'express'
import * as genreController from "../controller/genre.controller.js"

let router = express.Router()

/**
 * @swagger
 * /genres:
 *   get:
 *     tags: [Genres]
 *     summary: Liste des genres
 *     responses:
 *       200:
 *         description: Genres disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
router.get("/", genreController.getGenres)

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     tags: [Genres]
 *     summary: Genre par identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Genre trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre introuvable
 */
router.get("/:id", genreController.getGenresById)

export default router
