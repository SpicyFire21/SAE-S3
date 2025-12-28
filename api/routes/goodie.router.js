import express from 'express'
import * as goodieController from "../controller/goodie.controller.js"

let router = express.Router()

/**
 * @swagger
 * /goodies:
 *   get:
 *     summary: Récupérer tous les goodies
 *     tags:
 *       - Goodies
 *     responses:
 *       200:
 *         description: Liste des goodies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goodie'
 */
router.get("/", goodieController.getGoodies)

/**
 * @swagger
 * /goodies:
 *   post:
 *     summary: Ajouter un goodie
 *     tags:
 *       - Goodies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoodieInput'
 *     responses:
 *       201:
 *         description: Goodie créé
 */
router.post("/", goodieController.addGoodies)

/**
 * @swagger
 * /goodies/colors:
 *   get:
 *     summary: Récupérer les associations goodies-couleurs
 *     tags:
 *       - Goodies
 *     responses:
 *       200:
 *         description: Liste des associations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GoodieColor'
 */
router.get("/colors", goodieController.getGoodiesColors)

/**
 * @swagger
 * /goodies/sizes:
 *   get:
 *     summary: Récupérer les associations goodies-tailles
 *     tags:
 *       - Goodies
 *     responses:
 *       200:
 *         description: Liste des associations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SizesColor'
 */
router.get("/sizes", goodieController.getGoodiesSizes)

/**
 * @swagger
 * /goodies/colors:
 *   post:
 *     summary: Associer une couleur à un goodie
 *     tags:
 *       - Goodies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoodieColor'
 *     responses:
 *       201:
 *         description: Association créée
 *       400:
 *         description: Données invalides
 */
router.post("/colors", goodieController.addGoodiesColors)

/**
 * @swagger
 * /goodies/sizes:
 *   post:
 *     summary: Associer une taille à un goodie
 *     tags:
 *       - Goodies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoodieSize'
 *     responses:
 *       201:
 *         description: Association créée
 *       400:
 *         description: Données invalides
 */
router.post("/sizes", goodieController.addGoodiesSizes)

/**
 * @swagger
 * /goodies/{idgoodie}/colors:
 *   delete:
 *     summary: Supprimer toutes les couleurs d’un goodie
 *     tags:
 *       - Goodies
 *     parameters:
 *       - in: path
 *         name: idgoodie
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Suppression réussie
 *       404:
 *         description: Goodie introuvable
 */
router.delete("/:idgoodie/colors", goodieController.removeGoodiesColors)

/**
 * @swagger
 * /goodies/{idgoodie}/sizes:
 *   delete:
 *     summary: Supprimer toutes les tailles d’un goodie
 *     tags:
 *       - Goodies
 *     parameters:
 *       - in: path
 *         name: idgoodie
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Suppression réussie
 *       404:
 *         description: Goodie introuvable
 */
router.delete("/:idgoodie/sizes", goodieController.removeGoodiesSizes)

/**
 * @swagger
 * /goodies/{iduser}:
 *   put:
 *     summary: Modifier un goodie
 *     tags:
 *       - Goodies
 *     parameters:
 *       - in: path
 *         name: iduser
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoodieInput'
 *     responses:
 *       200:
 *         description: Goodie modifié
 *       404:
 *         description: Goodie introuvable
 */
router.put("/:iduser", goodieController.editGoodies)

/**
 * @swagger
 * /goodies/{idprovider}:
 *   get:
 *     summary: Récupérer les goodies d’un prestataire
 *     tags:
 *       - Goodies
 *     parameters:
 *       - in: path
 *         name: idprovider
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Liste des goodies d'un prestataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goodie'
 */
router.get("/:idprovider", goodieController.getGoodiesByProviderId)

export default router
