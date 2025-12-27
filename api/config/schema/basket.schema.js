/**
 * @openapi
 * components:
 *   schemas:
 *      Basket:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *         state:
 *           type: string
 *           enum:
 *             - wait
 *             - payed
 *       required:
 *         - user_id
 *         - date
 *         - state
 */