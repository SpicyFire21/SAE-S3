/**
 * @openapi
 * components:
 *   schemas:
 *     Projection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         stand_id:
 *           type: integer
 *         film_id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date-time
 *       required:
 *         - stand_id
 *         - film_id
 *         - date
 */
