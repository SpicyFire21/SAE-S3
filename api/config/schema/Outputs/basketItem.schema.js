/**
 * @openapi
 * components:
 *   schemas:
 *      BasketItem:
 *       type: object
 *       properties:
 *         basket_id:
 *           type: string
 *           format: uuid
 *         goodie_id:
 *           type: integer
 *         color_id:
 *           type: integer
 *         size_id:
 *           type: integer
 *         count:
 *           type: integer
 *       required:
 *         - basket_id
 *         - goodie_id
 *         - color_id
 *         - size_id
 *         - count
 */