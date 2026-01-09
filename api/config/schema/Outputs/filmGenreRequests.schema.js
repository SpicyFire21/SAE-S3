/**
 * @openapi
 * components:
 *   schemas:
 *      FilmGenreRequests:
 *       type: object
 *       properties:
 *         film_id:
 *           type: string
 *           format: uuid
 *         genre_id:
 *           type: integer
 *       required:
 *         - film_id
 *         - genre_id
 */