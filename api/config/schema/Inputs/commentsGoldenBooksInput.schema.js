/**
 * @swagger
 * components:
 *   schemas:
 *     CommentGoldenBookInput:
 *       type: object
 *       properties:
 *         iduser:
 *           type: string
 *           format: uuid
 *           description: Identifiant de l'utilisateur
 *         content:
 *           type: string
 *           description: Contenu du commentaire
 *       required:
 *         - iduser
 *         - content
 */