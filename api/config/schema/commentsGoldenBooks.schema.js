/**
 * @openapi
 * components:
 *   schemas:
 *      CommentGoldenBook:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         commentaire:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *       required:
 *         - user_id
 *         - commentaire
 *         - date
 */