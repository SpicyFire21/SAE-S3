/**
 * @openapi
 * components:
 *   schemas:
 *     VoteInput:
 *       type: object
 *       properties:
 *         iduser:
 *           type: string
 *           format: uuid
 *           description: Identifiant de l'utilisateur qui vote
 *           example: "c38acd4c-d6fc-4a19-bd24-98a7c18fa414"
 *         idfilm:
 *           type: string
 *           format: uuid
 *           description: Identifiant du film pour lequel on vote
 *           example: "6cec5c18-d60b-4372-916a-482bb4facaa0"
 *         idcategory:
 *           type: string
 *           format: uuid
 *           description: Identifiant de la catégorie de vote
 *           example: "3a6d9e1f-2b7c-4f8a-9c5d-7e3a1f6b9d2c"
 *       required:
 *         - iduser
 *         - idfilm
 *         - idcategory
 *
 */