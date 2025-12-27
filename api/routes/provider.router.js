import express from 'express'
import * as providerController from "../controller/provider.controller.js"

let router = express.Router()

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Récupérer la liste des prestataires validés
 *     tags:
 *       - Providers
 *     responses:
 *       200:
 *         description: Liste des prestataires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", providerController.getProviders)

/**
 * @swagger
 * /providers/requests:
 *   get:
 *     summary: Récupérer les demandes de prestataires
 *     tags:
 *       - Providers
 *     responses:
 *       200:
 *         description: Liste des demandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProviderRequest'
 */
router.get("/requests", providerController.getProviderRequests)

/**
 * @swagger
 * /providers/requests:
 *   post:
 *     summary: Ajouter une demande de prestataire
 *     tags:
 *       - Providers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProviderRequestInput'
 *     responses:
 *       201:
 *         description: Demande créée
 */
router.post("/requests", providerController.addProviderRequests)

/**
 * @swagger
 * /providers/requests:
 *   delete:
 *     summary: Supprimer une demande de prestataire
 *     tags:
 *       - Providers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Demande supprimée
 */
router.delete("/requests", providerController.deleteProviderRequests)

export default router
