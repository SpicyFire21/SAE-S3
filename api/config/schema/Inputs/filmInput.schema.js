/**
 * @openapi
 * components:
 *  schemas:
 *      FilmInput:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: Titre du film
 *                  example: "Inception"
 *              director_id:
 *                  type: string
 *                  format: uuid
 *                  description: Identifiant du réalisateur (référence à la table users)
 *                  example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *              release_date:
 *                  type: string
 *                  format: date
 *                  description: Date de sortie du film (YYYY-MM-DD)
 *                  example: "2010-07-21"
 *              duration:
 *                  type: integer
 *                  description: Durée du film en minutes
 *                  example: 148
 *              description:
 *                  type: string
 *                  description: Résumé ou synopsis du film
 *                  example: "Un voleur qui s'approprie des secrets précieux à partir du tréfonds du subconscient."
 *              poster:
 *                  type: string
 *                  description: URL ou chemin vers l'affiche du film
 *                  example: "https://exemple.com/posters/inception.jpg"
 *          required:
 *              - title
 *              - director_id
 */