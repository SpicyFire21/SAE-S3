import express from 'express'
import * as noteController from "../controller/note.controller.js";

let router = express.Router();

/**
 * @swagger
 * /notes:
 *   get:
 *     tags: [Notes]
 *     summary: Récupérer toutes les notes
 *     responses:
 *       200:
 *         description: Liste des notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", noteController.getNotes);

/**
 * @swagger
 * /notes:
 *   post:
 *     tags: [Notes]
 *     summary: Créer une note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *     responses:
 *       201:
 *         description: Note créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", noteController.addNote);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     tags: [Notes]
 *     summary: Récupérer une note par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la note
 *     responses:
 *       200:
 *         description: Note trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", noteController.getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     tags: [Notes]
 *     summary: Supprimer une note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la note
 *     responses:
 *       204:
 *         description: Note supprimée
 *       404:
 *         description: Note non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", noteController.deleteNote);

export default router;
