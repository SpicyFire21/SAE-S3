/**
 * @openapi
 * components:
 *   schemas:
 *      Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date-time
 *         stand_id:
 *           type: integer
 *         type:
 *           type: string
 *           enum:
 *             - film
 *             - autograph
 *       required:
 *         - user_id
 *         - date
 *         - stand_id
 *         - type
 */