import express from 'express'
import * as filmController from "../controller/film.controller.js"

let router = express.Router()

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Récupérer tous les films
 *     tags:
 *       - Films
 *     responses:
 *       200:
 *         description: Liste des films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", filmController.getFilms)

/**
 * @swagger
 * /films/{iddirector}:
 *   get:
 *     summary: Récupérer les films d’un réalisateur
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: iddirector
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID du réalisateur
 *     responses:
 *       200:
 *         description: Liste des films du réalisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 *       404:
 *         description: Réalisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:iddirector", filmController.getFilmDirector)

export default router
