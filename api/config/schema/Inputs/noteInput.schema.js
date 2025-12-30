/**
 * @openapi
 * components:
 *   schemas:
 *     NoteInput:
 *       type: object
 *       properties:
 *         value:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           example: 4.5
 *         iduser:
 *           type: string
 *           format: uuid
 *           example: "bb4b684c-0c67-4d19-ac21-b225b3e5c018"
 *       required:
 *         - value
 *         - iduser
 */