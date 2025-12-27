/**
 * @openapi
 * components:
 *   schemas:
 *      Note:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: string
 *           format: uuid
 *         value:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *         created_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - user_id
 *         - value
 */