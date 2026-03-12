import express from 'express'
import * as reservationController from "../controller/reservation.controller.js";


let router = express.Router();
/**
 * @openapi
 * /reservations:
 *   get:
 *     summary: Récupérer la liste des reservations
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: Liste des reservations récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projection'
 *       500:
 *         description: Erreur serveur
 */

router.get("/",reservationController.getReservations);

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
router.post("/reservation", reservationController.addFilmReservation)





export default router;
