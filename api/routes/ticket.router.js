import express from 'express'
import * as ticketController from "../controller/ticket.controller.js"

let router = express.Router()

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Créer un billet
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketInput'
 *     responses:
 *       201:
 *         description: Billet créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Données invalides
 */
router.post("/", ticketController.createTicket)

/**
 * @swagger
 * /tickets/prices:
 *   get:
 *     summary: Récupérer les tarifs de billets
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: Liste des tarifs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketPrice'
 */
router.get("/prices", ticketController.getTicketsPrice)

/**
 * @swagger
 * /tickets/{iduser}:
 *   get:
 *     summary: Récupérer les billets d’un utilisateur
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: iduser
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de l’utilisateur
 *     responses:
 *       200:
 *         description: Liste des billets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/:iduser", ticketController.getBilletsByUserId)

export default router
