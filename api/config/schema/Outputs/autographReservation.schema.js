/**
 * @openapi
 * components:
 *   schemas:
 *      AutographReservation:
 *       type: object
 *       properties:
 *         reservation_id:
 *           type: integer
 *         artist_id:
 *           type: string
 *           format: uuid
 *       required:
 *         - reservation_id
 *         - artist_id
 */