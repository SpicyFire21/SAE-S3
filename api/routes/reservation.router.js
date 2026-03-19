import express from 'express'
import * as reservationController from "../controller/reservation.controller.js";

let router = express.Router();

/**
 * @openapi
 * /reservations/{id}/event:
 *   get:
 *     summary: Récupérer le film ou l'autograph lié a la reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reservation
 *     responses:
 *       200:
 *         description: Event récuperé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id/event",reservationController.getEventFromReservation);


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
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Erreur serveur
 */

router.get("/",reservationController.getReservations);






export default router;
