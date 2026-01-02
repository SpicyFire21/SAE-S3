/**
 * @openapi
 * components:
 *   schemas:
 *     VotesScore:
 *       type: object
 *       properties:
 *         film_id:
 *           type: string
 *           format: uuid
 *           example: "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d"
 *         category_id:
 *           type: string
 *           format: uuid
 *           example: "3a6d9e1f-2b7c-4f8a-9c5d-7e3a1f6b9d2c"
 *         total_score:
 *           type: integer
 *           example: 1
 *           minimum: 0
 *       required:
 *         - film_id
 *         - category_id
 *         - total_score
 */
