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
 * /films/requests:
 *  get:
 *    summary: Récupérer toutes les demandes de films
 *    tags:
 *      - FilmRequests
 *    responses:
 *      200:
 *        description: Liste des demandes récupérée
 *        content:
 *          application/json:
 *             schema:
 *               type: array
 *      500:
 *        description: Erreur serveur
 */
router.get("/requests", filmController.getFilmRequests)

/**
 * @swagger
 * /films/requests/genres:
 *  get:
 *    summary: Récupérer les demandes avec leurs genres
 *    tags:
 *      - FilmGenreRequests
 *    responses:
 *      200:
 *        description: Liste des genres des demandes récupérée
 *        content:
 *          application/json:
 *             schema:
 *               type: array
 *      404:
 *         description: Film non trouvé
 *      500:
 *        description: Erreur serveur
 */
router.get("/requests/genres", filmController.getFilmRequestsGenres)

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


/**
 * @swagger
 * /films:
 *   post:
 *     summary: Ajouter un film
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmInput'
 *     responses:
 *       201:
 *         description: Film créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", filmController.addFilm)

/**
 * @swagger
 * /films/requests:
 *   post:
 *     summary: Créer une nouvelle demande de film
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmRequestInput'
 *     responses:
 *       201:
 *         description: Film créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilmRequests'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/requests", filmController.addFilmRequest)


/**
 * @swagger
 * /films/{id}:
 *   delete:
 *     summary: Supprimer un film par id
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID du film
 *     responses:
 *       200:
 *         description: Film supprimé
 *       400:
 *         description: Donnée manquante
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", filmController.deleteFilm)

/**
 * @swagger
 * /films/requests/{id}:
 *   delete:
 *     summary: Supprimer une requête de film par id
 *     tags:
 *       - FilmRequests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la requête du film
 *     responses:
 *       200:
 *         description: Requête film supprimé
 *       400:
 *         description: Donnée manquante
 *       404:
 *         description: Requête film non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/requests/:id", filmController.deleteFilmRequest)

export default router
