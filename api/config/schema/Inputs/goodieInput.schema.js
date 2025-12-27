/**
 * @openapi
 * components:
 *   schemas:
 *     GoodieInput:
 *       type: object
 *       required:
 *         - owner_id
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         owner_id:
 *           type: string
 *           format: uuid
 *           example: "c38acd4c-d6fc-4a19-bd24-98a7c18fa414"
 *         name:
 *           type: string
 *           example: "T-shirt"
 *         price:
 *           type: number
 *           format: float
 *           example: 20
 *         quantity:
 *           type: integer
 *           example: 50
 *
 */