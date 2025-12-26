import express from 'express'
import * as projectionController from "../controller/projection.controller.js";


let router = express.Router();
/**
 * @openapi
 * /projections:
 *   get:
 *     summary: Récupérer la liste des projections
 *     tags:
 *       - Projections
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

router.get("/",projectionController.getProjections);





export default router;
