/**
 * @openapi
 * components:
 *   schemas:
 *     StandReservationRequestInput:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: ["pending", "accepted", "rejected"]
 *           default: "pending"
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
