import express from 'express'
import * as standController from "../controller/stand.controller.js"
import {verifyRole, verifyToken} from "../middlewares/jwt.middleware.js";

let router = express.Router()

/**
 * @swagger
 * /stands:
 *   get:
 *     summary: Récupérer tous les stands
 *     tags:
 *       - Stands
 *     responses:
 *       200:
 *         description: Liste des stands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stand'
 */
router.get("/", standController.getStands)

/**
 * @swagger
 * /stands/types:
 *   get:
 *     summary: Récupérer tous les types de stands
 *     tags:
 *       - Stands
 *     responses:
 *       200:
 *         description: Liste des types de stands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StandType'
 */
router.get("/types", standController.getStandsTypes)

/**
 * @swagger
 * /stands/types/{idtype}:
 *   get:
 *     summary: Récupérer un type de stand par ID
 *     tags:
 *       - Stands
 *     parameters:
 *       - in: path
 *         name: idtype
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du type de stand
 *     responses:
 *       200:
 *         description: Type de stand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandType'
 *       404:
 *         description: Type non trouvé
 */
router.get("/types/:idtype", standController.getStandTypeById)

/**
 * @swagger
 * /stands/reservations:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer les demandes de réservation de stand
 *     description: Retourne la liste des demandes de réservation de stands.
 *     responses:
 *       200:
 *         description: Liste des demandes de réservation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StandReservationRequest'
 *       500:
 *         description: Erreur serveur
 */
router.get("/reservations",standController.getStandsReservationsRequests)

/**
 * @swagger
 * /stands/reservations:
 *   post:
 *     tags: [Stands]
 *     summary: Créer une demande de réservation de stand
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StandReservationRequestInput'
 *     responses:
 *       201:
 *         description: Demande créée
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       500:
 *         description: Erreur serveur
 */
router.post("/reservations", [verifyToken, verifyRole([1,2])], standController.addStandRequest)

/**
 * @swagger
 * /stands/reservations/{idreservation}:
 *   delete:
 *     tags: [Stands]
 *     summary: Supprimer une demande de réservation de stand
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idreservation
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Demande supprimée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/reservations/:idreservation", [verifyToken, verifyRole([1,2])], standController.removeStandRequest)


/**
 * @swagger
 * /stands/{id}:
 *   get:
 *     summary: Récupérer un stand par ID
 *     tags:
 *       - Stands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du stand
 *     responses:
 *       200:
 *         description: Stand trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stand'
 *       404:
 *         description: Stand non trouvé
 */
router.get("/:id", standController.getStandsById)

export default router
