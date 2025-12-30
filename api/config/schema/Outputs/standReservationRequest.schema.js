/**
 * @openapi
 * components:
 *   schemas:
 *     StandReservationRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         request_date:
 *           type: string
 *           format: date-time
 *           example: 2025-12-23T14:00:00
 *         idstand:
 *           type: integer
 *           example: 4
 *         iduser:
 *           type: string
 *           format: uuid
 *           example: c38acd4c-d6fc-4a19-bd24-98a7c18fa414
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *           example: pending
 *       required:
 *         - request_date
 *         - idstand
 *         - iduser
 *         - status
 */
