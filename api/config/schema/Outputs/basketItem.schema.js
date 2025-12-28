/**
 * @openapi
 * components:
 *   schemas:
 *      BasketItem:
 *       type: object
 *       properties:
 *         idbasket:
 *           type: string
 *           format: uuid
 *         idgoodie:
 *           type: integer
 *         idcolor:
 *           type: integer
 *         idsize:
 *           type: integer
 *         count:
 *           type: integer
 *       required:
 *         - idbasket
 *         - idgoodie
 *         - idcolor
 *         - idsize
 *         - count
 */