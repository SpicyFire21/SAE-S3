/**
 * @openapi
 * components:
 *   schemas:
 *      Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         date_from:
 *           type: string
 *           format: date-time
 *         date_to:
 *           type: string
 *           format: date-time
 *         price_id:
 *           type: string
 *           format: uuid
 *       required:
 *         - user_id
 *         - date_from
 *         - date_to
 *         - price_id
 */