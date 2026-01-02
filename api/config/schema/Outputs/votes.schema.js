/**
 * @openapi
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "b8e2f1c4-7d3a-4c9b-8f1e-2d7c5a9b3e6f"
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "c38acd4c-d6fc-4a19-bd24-98a7c18fa414"
 *         film_id:
 *           type: string
 *           format: uuid
 *           example: "a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d"
 *         category_id:
 *           type: string
 *           format: uuid
 *           example: "3a6d9e1f-2b7c-4f8a-9c5d-7e3a1f6b9d2c"
 *       required:
 *         - id
 *         - user_id
 *         - film_id
 *         - category_id
 */
