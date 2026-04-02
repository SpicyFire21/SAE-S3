import express from 'express'
import * as filmController from "../controller/film.controller.js"
import {verifyRole, verifyToken} from "../middlewares/jwt.middleware.js";

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
 * /films/reservations:
 *   get:
 *     summary: Récupérer tous les reservations de film
 *     description: Retourne la liste complète des reservations de film.
 *     tags:
 *       - Films
 *     responses:
 *       200:
 *         description: Liste des reservations de film
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FilmReservation'
 *       500:
 *         description: Erreur serveur
 */
router.get("/reservations",filmController.getFilmsReservations)


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
 * @openapi
 * /films/projections:
 *   get:
 *     summary: Récupérer la liste des projections
 *     tags:
 *       - Films
 *     responses:
 *       200:
 *         description: Liste des projections récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projection'
 *       500:
 *         description: Erreur serveur
 */
router.get("/projections",filmController.getProjections);
/**
 * @swagger
 * /films/reservation:
 *   post:
 *     summary: Créer une nouvelle reservation de film (projection)
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmRequestInput'
 *           example:
 *             userId: "c38acd4c-d6fc-4a19-bd24-98a7c18fa414"
 *             type: "film"
 *             date: "2025-12-23T14:00:00"
 *             standId: 1
 *             projectionId: 1
 *     responses:
 *       201:
 *         description: Reservation de film créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilmReservation'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/reservation", filmController.addFilmReservation)

/**
 * @swagger
 * /films/projections:
 *   post:
 *     summary: Créer une nouvelle projection de film
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmProjectionInput'
 *           example:
 *             date: "2025-12-23T14:00:00"
 *             idstand: 1
 *             idfilm: 6f207e95-5400-471f-a933-d01d817b0608
 *
 *     responses:
 *       201:
 *         description: Projections de film créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projection'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/projections", [verifyToken, verifyRole([1, 2])], filmController.addProjection);
/**
 * @swagger
 * /films/projections:
 *   put:
 *     summary: Modifier une projection de film
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmProjectionUpdateInput'
 *           example:
 *             id: 1
 *             date: "2025-12-24T18:00:00"
 *             idstand: 2
 *             idfilm: 6f207e95-5400-471f-a933-d01d817b0608
 *     responses:
 *       200:
 *         description: Projection modifiée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projection'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 *
 *
 */
router.put("/projections", [verifyToken, verifyRole([1, 2])], filmController.editProjection);
/**
 * @swagger
 *     /films/projections/{id}:
 *   delete:
 *     summary: Supprimer une projection de film
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Projection supprimée
 *       404:
 *         description: Projection non trouvée
 *       409:
 *          description: Projections existante dans une réservation
 *       500:
 *         description: Erreur serveur
 */
router.delete("/projections/:id", [verifyToken, verifyRole([1, 2])], filmController.deleteProjection);

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
 * /films/{filmId}/stands:
 *   get:
 *     summary: Récupérer les stands qui projettent un film
 *     description: Retourne la liste des stands ayant une projection du film spécifié.
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: filmId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant du film
 *     responses:
 *       200:
 *         description: Liste des stands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stand'
 *       400:
 *         description: Identifiant manquant
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:filmId/stands", filmController.getStandsByFilmId)


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
