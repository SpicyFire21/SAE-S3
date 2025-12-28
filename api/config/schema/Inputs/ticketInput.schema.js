/**
 * @openapi
 * components:
 *   schemas:
 *
 *     TicketInput:
 *       type: object
 *       required:
 *         - iduser
 *         - idprice
 *         - from
 *         - to
 *       properties:
 *         iduser:
 *           type: string
 *           format: uuid
 *           example: "c38acd4c-d6fc-4a19-bd24-98a7c18fa414"
 *         idprice:
 *           type: string
 *           format: uuid
 *           example: "0936df09-1754-448f-8b09-f6c794c6b251"
 *         from:
 *           type: string
 *           format: date-time
 *           example: "2025-12-27T10:00:00Z"
 *         to:
 *           type: string
 *           format: date-time
 *           example: "2025-12-27T18:00:00Z"
 *
 */