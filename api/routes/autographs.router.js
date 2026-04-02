import express from 'express'
import * as autographsController from "../controller/autographs.controller.js";
import { verifyToken, verifyRole } from "../middlewares/jwt.middleware.js";


let router = express.Router();

router.get("/", autographsController.getAutographs);

/**
 * @swagger
 * /autographs/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations d'autographes
 *     tags:
 *       - Autographs
 *     responses:
 *       200:
 *         description: Liste des réservations d'autographes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reservation_id:
 *                     type: integer
 *                   autograph_id:
 *                     type: integer
 *       500:
 *         description: Erreur serveur
 */
router.get("/reservations", autographsController.getAutographsReservations);

/**
 * @swagger
 * /autographs/reservations:
 *   post:
 *     summary: Ajouter une réservation d'autographe
 *     tags:
 *       - Autographs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - iduser
 *               - type
 *               - date
 *               - idstand
 *               - idautograph
 *             properties:
 *               iduser:
 *                 type: string
 *                 format: uuid
 *               type:
 *                 type: string
 *                 example: autograph
 *               date:
 *                 type: string
 *                 format: date-time
 *               idstand:
 *                 type: integer
 *               idautograph:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur serveur
 */
router.post("/reservations", autographsController.addAutographsReservations);

/**
 * @swagger
 * /autographs/{id}:
 *   get:
 *     summary: Récupérer un autographe par ID
 *     tags:
 *       - Autographs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'autographe
 *     responses:
 *       200:
 *         description: Autographe trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autograph'
 *       404:
 *         description: Autographe non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", autographsController.getAutographsById);

/**
 * @swagger
 * /autographs/stand/{idstand}:
 *   get:
 *     summary: Récupérer les autographes d'un stand
 *     tags:
 *       - Autographs
 *     parameters:
 *       - in: path
 *         name: idstand
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du stand
 *     responses:
 *       200:
 *         description: Liste des autographes du stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autograph'
 *       404:
 *         description: Aucun autographe trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/stand/:idstand", autographsController.getAutographsByStandId);

/**
 * @swagger
 * /autographs:
 *   post:
 *     summary: Ajouter un autographe
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Autographs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idstand
 *               - iduser
 *               - begindate
 *               - duration
 *             properties:
 *               idstand:
 *                 type: integer
 *                 example: 4
 *               iduser:
 *                 type: string
 *                 format: uuid
 *                 example: "a81699b9-94d1-4f72-9df4-1588dc1b2cc5"
 *               begindate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-23T18:00:00.000Z"
 *               duration:
 *                 type: integer
 *                 description: Durée en minutes
 *                 example: 60
 *     responses:
 *       201:
 *         description: Autographe créé avec succès
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur serveur
 */
router.post("/", [verifyToken, verifyRole([1, 2])], autographsController.addAutograph);

/**
 * @swagger
 * /autographs:
 *   put:
 *     summary: Modifier un autographe
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Autographs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idstand
 *               - iduser
 *               - begindate
 *               - duration
 *             properties:
 *               id:
 *                 type: integer
 *               idstand:
 *                 type: integer
 *               iduser:
 *                 type: string
 *                 format: uuid
 *               begindate:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: integer
 *                 description: Durée en minutes
 *     responses:
 *       201:
 *         description: Autographe modifié avec succès
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur serveur
 */
router.put("/", [verifyToken, verifyRole([1, 2])], autographsController.editAutograph);

/**
 * @swagger
 * /autographs/{id}:
 *   delete:
 *     summary: Supprimer un autographe
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Autographs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'autographe à supprimer
 *     responses:
 *       201:
 *         description: Autographe supprimé avec succès
 *       400:
 *         description: ID manquant
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", [verifyToken, verifyRole([1, 2])], autographsController.deleteAutograph);

export default router;