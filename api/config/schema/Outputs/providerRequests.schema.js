/**
 * @openapi
 * components:
 *   schemas:
 *      ProviderRequest:
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
 *         email2:
 *           type: string
 *         droit:
 *           type: integer
 *           minimum: 0
 *           maximum: 1
 *         date:
 *           type: string
 *           format: date-time
 *       required:
 *         - login
 *         - password
 *         - email
 *         - email2
 *         - droit
 */