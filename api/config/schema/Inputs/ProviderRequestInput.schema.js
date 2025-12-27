/**
 * @openapi
 * components:
 *   schemas:
 *     ProviderRequestInput:
 *       type: object
 *       required:
 *         - name
 *         - login
 *         - password
 *         - email
 *         - email2
 *         - droit
 *       properties:
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
 *           enum: [0, 1]
 */