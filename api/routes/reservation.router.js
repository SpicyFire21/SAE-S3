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





export default router;
