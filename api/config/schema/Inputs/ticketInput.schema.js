/**
 * @openapi
 * components:
 *   schemas:
 *
 *     TicketInput:
 *       type: object
 *       required:
 *         - user_id
 *         - price_id
 *         - date_from
 *         - date_to
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "c38acd4c-d6fc-4a19-bd24-98a7c18fa414"
 *         price_id:
 *           type: string
 *           format: uuid
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         date_from:
 *           type: string
 *           format: date-time
 *           example: "2025-12-27T10:00:00Z"
 *         date_to:
 *           type: string
 *           format: date-time
 *           example: "2025-12-27T18:00:00Z"
 *
 */