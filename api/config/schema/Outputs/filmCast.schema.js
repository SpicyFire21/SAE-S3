/**
 * @openapi
 * components:
 *   schemas:
 *      FilmCast:
 *       type: object
 *       properties:
 *         film_id:
 *           type: string
 *           format: uuid
 *         actor_id:
 *           type: string
 *           format: uuid
 *       required:
 *         - film_id
 *         - actor_id
 */