import express from 'express'
import * as filmController from "../controller/film.controller.js"

let router = express.Router()

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Récupérer tous les films
 *     description: Retourne la liste complète des films.
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
 * /films/genres:
 *   get:
 *     summary: Récupérer les films avec leurs genres
 *     description: Retourne les films associés à leurs genres.
 *     tags:
 *       - Films
 *     responses:
 *       200:
 *         description: Liste des films avec genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Erreur serveur
 */
router.get("/genres", filmController.getFilmsGenres)

/**
 * @swagger
 * /films/casts:
 *   get:
 *     summary: Récupérer les films avec leur casting
 *     description: Retourne les films associés à leurs acteurs.
 *     tags:
 *       - Films
 *     responses:
 *       200:
 *         description: Liste des films avec casting
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Erreur serveur
 */
router.get("/casts", filmController.getFilmsCasts)


/**
 * @swagger
 * /films/{id}:
 *   get:
 *     summary: Récupérer un film par ID
 *     description: Retourne un film précis à partir de son identifiant.
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du film
 *     responses:
 *       200:
 *         description: Film trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", filmController.getFilmsById)

export default router
