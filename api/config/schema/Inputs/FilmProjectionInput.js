/**
 * @openapi
 * components:
 *  schemas:
 *      FilmProjectionInput:
 *          type: object
 *          properties:
 *              idstand:
 *                  type: string
 *                  format: uuid
 *                  description: Identifiant du stand
 *                  example: "1"
 *              idfilm:
 *                  type: string
 *                  format: uuid
 *                  description: Identifiant du filù
 *                  example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *              date:
 *                  type: string
 *                  format: date
 *                  description: Date de sortie du film (YYYY-MM-DD)
 *                  example: "2010-07-21"
 *          required:
 *              - idstand
 *              - idfilm
 */