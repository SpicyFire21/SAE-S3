/**
 * @openapi
 * components:
 *   schemas:
 *      TicketPrice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *       required:
 *         - name
 *         - price
 */