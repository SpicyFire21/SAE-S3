/**
 * @openapi
 * components:
 *   schemas:
 *      Autograph:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         stand_id:
 *           type: integer
 *         user_id:
 *           type: string
 *           format: uuid
 *         begin_date:
 *           type: string
 *           format: date-time
 *         duration:
 *           type: integer
 *       required:
 *         - stand_id
 *         - user_id
 *         - begin_date
 *         - duration
 */