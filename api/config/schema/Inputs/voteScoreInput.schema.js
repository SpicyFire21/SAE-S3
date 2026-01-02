/**
 * @openapi
 * components:
 *   schemas:
 *     VoteScoreInput:
 *       type: object
 *       properties:
 *         idfilm:
 *           type: string
 *           format: uuid
 *           description: Identifiant du film dont le score est modifié
 *           example: "6cec5c18-d60b-4372-916a-482bb4facaa0"
 *         idcategory:
 *           type: string
 *           format: uuid
 *           description: Identifiant de la catégorie du vote
 *           example: "3a6d9e1f-2b7c-4f8a-9c5d-7e3a1f6b9d2c"
 *         value:
 *           type: integer
 *           description: Valeur à ajouter au score (peut être positive ou négative)
 *           example: 1
 *       required:
 *         - idfilm
 *         - idcategory
 *         - value
 *
 */