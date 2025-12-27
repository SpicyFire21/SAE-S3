/**
 * @openapi
 * components:
 *   schemas:
 *      Goodie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         owner_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         quantity:
 *           type: integer
 *       required:
 *         - owner_id
 *         - name
 *         - price
 *         - quantity
 */