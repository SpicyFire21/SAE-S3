/**
 * @openapi
 * components:
 *   schemas:
 *     StandReservationRequestInput:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         idstand:
 *           type: integer
 *         iduser:
 *           type: string
 *           format: uuid
 *       required:
 *         - status
 *         - idstand
 *         - iduser
 */
