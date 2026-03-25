import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";



async function getFilms() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM films');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des films' };
    } finally {
        db.release();
    }
}

async function getFilmsById(id){
    const db = await pool.connect();
    if (!id){
        return { error: 1, status: 400, data: 'id manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM films where id =$1',[id]);
        return { error: 0, status: 200, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération du film par id' };
    } finally {
        db.release();
    }
}

async function getFilmsCasts() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM films_cast');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des casts des films' };
    } finally {
        db.release();
    }
}

async function getFilmsGenres() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM films_genres');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des genres des films' };
    } finally {
        db.release();
    }
}

async function getFilmRequests() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM films_request');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des requêtes de films' };
    } finally {
        db.release();
    }
}

async function getFilmRequestsGenres() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM films_genres_request');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des genres des requêtes de films' };
    } finally {
        db.release();
    }
}

async function addFilm(data) {
    const db = await pool.connect();

    if (!data.title) {
        return { error: 1, status: 400, data: "Le titre du film est manquant" };
    }
    if (!data.director_id) {
        return { error: 1, status: 400, data: "L'identifiant du réalisateur (director_id) est manquant" };
    }
    if (!data.duration) {
        return { error: 1, status: 400, data: "La durée du film est manquant" };
    }

    try {
        // vérifie si le film existe déjà (par titre et réalisateur)
        const check = await db.query(
            'SELECT * FROM films WHERE title = $1 AND director_id = $2',
            [data.title, data.director_id]
        );

        if (check.rowCount > 0) {
            return { error: 1, status: 409, data: 'Ce film existe déjà pour ce réalisateur' };
        }
        const queryText = `
            INSERT INTO films (id, title, director_id, release_date, duration, description, poster) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`;

        const values = [
            uuidv4(),                        // $1
            data.title,                      // $2
            data.director_id,                // $3
            data.release_date || null,       // $4
            data.duration,                   // $5
            data.description || null,        // $6
            data.poster || null              // $7
        ];

        const result = await db.query(queryText, values);
        return { error: 0, status: 201, data: result.rows[0] };

    } catch (error) {
        console.error("Erreur dans addFilm:", error);
        if (error.code === '23503') {
            return { error: 1, status: 400, data: "Le réalisateur spécifié n'existe pas" };
        }
        return { error: 1, status: 500, data: "Erreur lors de la création du film" };
    } finally {
        db.release();
    }
}

async function addFilmRequest(data) {
    const db = await pool.connect();

    if (!data.title) {
        return { error: 1, status: 400, data: "Le titre du film est manquant" };
    }
    if (!data.director_id) {
        return { error: 1, status: 400, data: "L'identifiant du réalisateur (director_id) n'a pas pu être récupérer" };
    }
    if (!data.duration) {
        return { error: 1, status: 400, data: "La durée du film est manquant" };
    }

    try {
        // vérifie si la requete de film existe déjà (par titre et réalisateur)
        const check = await db.query(
            'SELECT * FROM films_request WHERE title = $1 AND director_id = $2',
            [data.title, data.director_id]
        );

        if (check.rowCount > 0) {
            return { error: 1, status: 409, data: 'Cette requête de film existe déjà pour ce réalisateur' };
        }
        const queryText = `
            INSERT INTO films_request (id, title, director_id, release_date, duration, description, poster) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`;

        const values = [
            uuidv4(),                        // $1
            data.title,                      // $2
            data.director_id,                // $3
            data.release_date || null,       // $4
            data.duration,                   // $5
            data.description || null,        // $6
            data.poster || null              // $7
        ];

        const result = await db.query(queryText, values);
        return { error: 0, status: 201, data: result.rows[0] };

    } catch (error) {
        console.error("Erreur dans addFilmRequest:", error);
        if (error.code === '23503') {
            return { error: 1, status: 400, data: "Le réalisateur n'existe pas" };
        }
        return { error: 1, status: 500, data: "Erreur lors de la requête de film" };
    } finally {
        db.release();
    }
}

async function deleteFilmRequest(id) {
    const db = await pool.connect();
    if (!id) {
        return { error: 1, status: 400, data: 'Identifiant requête du film manquant' };
    }
    try {
        const check = await db.query('SELECT * FROM films_request WHERE id = $1', [id]);

        if (check.rowCount === 0) {
            return { error: 1, status: 404, data: 'Requête film inexistant' };
        }

        const res = await db.query('DELETE FROM films_request WHERE id = $1 RETURNING *', [id]);

        return { error: 0, status: 200, data: res.rows[0] };

    } catch (error) {
        console.error("Erreur dans deleteFilmRequest:", error);

        if (error.code === '23503') {
            return {
                error: 1,
                status: 409,
                data: "Impossible de supprimer cette requête de film car il est lié à d'autres données."
            };
        }

        return { error: 1, status: 500, data: 'Erreur lors de la suppression du film' };
    } finally {
        db.release();
    }
}

async function deleteFilm(id) {
    const db = await pool.connect();
    if (!id) {
        return { error: 1, status: 400, data: 'Identifiant du film manquant' };
    }
    try {
        const check = await db.query('SELECT * FROM films WHERE id = $1', [id]);

        if (check.rowCount === 0) {
            return { error: 1, status: 404, data: 'Film inexistant' };
        }

        const res = await db.query('DELETE FROM films WHERE id = $1 RETURNING *', [id]);

        return { error: 0, status: 200, data: res.rows[0] };

    } catch (error) {
        console.error("Erreur dans deleteFilm:", error);

        // Gestion spécifique si le film est lié à d'autres données (Votes, Cast, etc.)
        if (error.code === '23503') {
            return {
                error: 1,
                status: 409,
                data: "Impossible de supprimer ce film car il est lié à d'autres données (votes ou casting)."
            };
        }

        return { error: 1, status: 500, data: 'Erreur lors de la suppression du film' };
    } finally {
        db.release();
    }
}

async function getProjections() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM projections');
        return {error: 0, status: 200, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des projections'};
    } finally {
        db.release();
    }
}

async function addProjection(projection) {
    const db = await pool.connect();

    if (!projection.idstand) {
        return { error: 1, status: 400, data: 'Identifiant du stand manquant' };
    }
    if (!projection.idfilm) {
        return { error: 1, status: 400, data: 'Identifiant du film manquant' };
    }
    if (!projection.date) {
        return { error: 1, status: 400, data: 'date manquante' };
    }
    const checkStand = await db.query('SELECT * FROM stands WHERE id = $1', [projection.idstand]);

    if (checkStand.rowCount === 0) {
        return { error: 1, status: 404, data: 'projection inexistant' };
    }

    const checkFilm = await db.query('SELECT * FROM films WHERE id = $1', [projection.idfilm]);

    if (checkFilm.rowCount === 0) {
        return { error: 1, status: 404, data: 'film inexistant' };
    }


    try {
        const res = await db.query('INSERT INTO projections (id, stand_id, film_id, date) VALUES ($1,$2,$3,$4) RETURNING *',[uuidv4(),projection.idstand,projection.idfilm,projection.date]);
        return {error: 0, status: 201, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de l\'ajout de la projections'};
    } finally {
        db.release();
    }
}

async function editProjection(projection) {
    const db = await pool.connect();
    if (!projection.idstand) {
        return { error: 1, status: 400, data: 'Identifiant du stand manquant' };
    }
    if (!projection.idfilm) {
        return { error: 1, status: 400, data: 'Identifiant du film manquant' };
    }
    if (!projection.date) {
        return { error: 1, status: 400, data: 'date manquante' };
    }
    if (!projection.id) {
        return { error: 1, status: 400, data: 'Identifiant manquante' };
    }

    const checkStand = await db.query('SELECT * FROM stands WHERE id = $1', [projection.idstand]);

    if (checkStand.rowCount === 0) {
        return { error: 1, status: 404, data: 'projection inexistant' };
    }
    const check = await db.query('SELECT * FROM projections WHERE id = $1', [projection.id]);

    if (check.rowCount === 0) {
        return { error: 1, status: 404, data: 'projection inexistant' };
    }
    const checkFilm = await db.query('SELECT * FROM films WHERE id = $1', [projection.idfilm]);

    if (checkFilm.rowCount === 0) {
        return { error: 1, status: 404, data: 'film inexistant' };
    }
    try {
        const res = await db.query('UPDATE projections SET stand_id=$2,film_id=$3,date=$4 where id=$1 RETURNING *',[projection.id,projection.idstand,projection.idfilm,projection.date]);
        return {error: 0, status: 200, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la modification des projections'};
    } finally {
        db.release();
    }
}

async function deleteProjection(id) {
    const db = await pool.connect();
    try {
        const check = await db.query('SELECT * FROM projections WHERE id = $1', [id]);

        if (check.rowCount === 0) {
            return { error: 1, status: 404, data: 'projection inexistant' };
        }

        const res = await db.query('DELETE FROM projections WHERE id = $1 RETURNING *', [id]);

        return {error: 0, status: 200, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la suppresion des projections'};
    } finally {
        db.release();
    }
}


async function addFilmReservation(data) {
    const db = await pool.connect();

    if (!data.userId) return { error: 1, status: 400, data: 'userId manquant' };
    if (!data.type) return { error: 1, status: 400, data: 'type manquant' };
    if (!data.date) return { error: 1, status: 400, data: 'date manquant' };
    if (!data.standId) return { error: 1, status: 400, data: 'standId manquant' };
    if (!data.projectionId) return { error: 1, status: 400, data: 'projectionId manquant' };

    try {
        await db.query('BEGIN');

        const reservationRes = await db.query(
            'INSERT INTO reservations (user_id, type, date, stand_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [data.userId, data.type, data.date, data.standId]
        );
        const reservation = reservationRes.rows[0];

        const filmReservationRes = await db.query(
            'INSERT INTO film_reservations (reservation_id, projection_id) VALUES ($1, $2) RETURNING *',
            [reservation.id, data.projectionId]
        );

        await db.query('COMMIT');

        return { error: 0, status: 201, data: { reservation, filmReservation: filmReservationRes.rows[0] } };
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la reservation de film' };
    } finally {
        db.release();
    }
}

async function getFilmsReservations() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM film_reservations');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations des films' };
    } finally {
        db.release();
    }
}



export default {
    getFilms,
    getFilmsById,
    getFilmsCasts,
    getFilmsGenres,
    getFilmRequests,
    getFilmRequestsGenres,
    getFilmsReservations,

    addFilmReservation,
    addFilm,
    addFilmRequest,

    deleteFilm,
    deleteFilmRequest,

    getProjections,
    addProjection,
    editProjection,
    deleteProjection

}