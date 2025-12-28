/**
 * @openapi
 * components:
 *   schemas:
 *     GoodieInput:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         id:
 *           type: number
 *           format: integer
 *           example: 1
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