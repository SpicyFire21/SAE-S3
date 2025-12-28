import express from 'express'
import * as basketController from "../controller/basket.controller.js"

let router = express.Router()

/**
 * @swagger
 * /baskets/items:
 *   get:
 *     summary: Récupérer tous les items de panier (admin / debug)
 *     tags:
 *       - Baskets
 *     responses:
 *       200:
 *         description: Liste de tous les items de panier
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BasketItem'
 */
router.get("/items", basketController.getAllBasketItems)

/**
 * @swagger
 * /baskets/items:
 *   post:
 *     summary: Ajouter un item au panier
 *     tags:
 *       - Baskets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BasketItem'
 *     responses:
 *       201:
 *         description: Item ajouté au panier
 */
router.post("/items", basketController.addBasketItems)

/**
 * @swagger
 * /baskets/current/{iduser}:
 *   get:
 *     summary: Récupérer le panier actif d’un utilisateur
 *     tags:
 *       - Baskets
 *     parameters:
 *       - in: path
 *         name: iduser
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Panier actif
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Basket'
 */
router.get("/current/:iduser", basketController.getBasketByUserId)

/**
 * @swagger
 * /baskets/{idbasket}/items:
 *   get:
 *     summary: Récupérer les items d’un panier
 *     tags:
 *       - Baskets
 *     parameters:
 *       - in: path
 *         name: idbasket
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Liste des items du panier
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BasketItem'
 */
router.get("/:idbasket/items", basketController.getBasketItems)

/**
 * @swagger
 * /baskets/{idbasket}/items/{idgoodie}/{idcolor}/{idsize}:
 *   delete:
 *     summary: Supprimer un item précis du panier
 *     tags:
 *       - Baskets
 *     parameters:
 *       - in: path
 *         name: idbasket
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: idgoodie
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idcolor
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idsize
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item supprimé du panier
 *       404:
 *         description: Item non trouvé
 */
router.delete("/:idbasket/items/:idgoodie/:idcolor/:idsize", basketController.removeFromBasket)

/**
 * @swagger
 * /baskets/{iduser}:
 *   get:
 *     summary: Récupérer tous les paniers d’un utilisateur
 *     tags:
 *       - Baskets
 *     parameters:
 *       - in: path
 *         name: iduser
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Liste des paniers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Basket'
 */
router.get("/:iduser", basketController.getAllBasketByUserId)

/**
 * @swagger
 * /baskets/{idbasket}:
 *   patch:
 *     summary: Payer un panier
 *     tags:
 *       - Baskets
 *     parameters:
 *       - in: path
 *         name: idbasket
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Panier payé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Basket'
 */
router.patch("/:idbasket", basketController.payOrder)

export default router
