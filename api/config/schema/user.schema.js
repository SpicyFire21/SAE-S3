/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         login:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         droit:
 *           type: integer
 *           minimum: 0
 *           maximum: 2
 *         session:
 *           type: string
 *         type:
 *           type: string
 *         nom_photo:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - login
 *         - password
 *         - email
 *         - droit
 */