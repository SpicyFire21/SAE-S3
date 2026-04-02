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

    if (!data.title || !data.director_id || !data.duration) {
        return { error: 1, status: 400, data: "Données manquantes pour la création du film" };
    }

    try {
        await db.query('BEGIN'); // Début de transaction

        const check = await db.query(
            'SELECT * FROM films WHERE title = $1 AND director_id = $2',
            [data.title, data.director_id]
        );

        if (check.rowCount > 0) {
            await db.query('ROLLBACK');
            return { error: 1, status: 409, data: 'Ce film existe déjà' };
        }

        const queryText = `
            INSERT INTO films (id, title, director_id, release_date, duration, description, poster)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`;

        const filmId = data.id || uuidv4();
        const values = [
            filmId,
            data.title,
            data.director_id,
            data.release_date || null,
            data.duration,
            data.description || null,
            data.poster || null
        ];

        const result = await db.query(queryText, values);
        const newFilm = result.rows[0];

        // --- INSERTION DES GENRES ---
        if (data.genreIds && Array.isArray(data.genreIds)) {
            for (const genreId of data.genreIds) {
                await db.query(
                    'INSERT INTO films_genres (film_id, genre_id) VALUES ($1, $2)',
                    [filmId, genreId]
                );
            }
        }

        await db.query('COMMIT');
        return { error: 0, status: 201, data: newFilm };

    } catch (error) {
        await db.query('ROLLBACK');
        console.error("Erreur dans addFilm:", error);
        return { error: 1, status: 500, data: "Erreur lors de la création du film" };
    } finally {
        db.release();
    }
}

async function addFilmRequest(data) {
    const db = await pool.connect();

    // 1. Validations de base
    if (!data.title || !data.director_id || !data.duration) {
        return { error: 1, status: 400, data: "Données manquantes (titre, réalisateur ou durée)" };
    }

    try {
        // Début de la transaction pour éviter les données orphelines
        await db.query('BEGIN');

        // 2. Vérification d'existence
        const check = await db.query(
            'SELECT * FROM films_request WHERE title = $1 AND director_id = $2',
            [data.title, data.director_id]
        );
        if (check.rowCount > 0) {
            await db.query('ROLLBACK');
            return { error: 1, status: 409, data: 'Cette requête de film existe déjà' };
        }

        // 3. Insertion du film
        const queryFilm = `
            INSERT INTO films_request (id, title, director_id, release_date, duration, description, poster) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`;

        const filmId = uuidv4();
        const filmValues = [
            filmId,
            data.title,
            data.director_id,
            data.release_date || null,
            data.duration,
            data.description || null,
            data.poster || null
        ];

        const result = await db.query(queryFilm, filmValues);
        const newFilmRequest = result.rows[0];

        // 4. Insertion des genres
        if (data.genreIds && Array.isArray(data.genreIds) && data.genreIds.length > 0) {
            for (const genreId of data.genreIds) {
                await db.query(
                    'INSERT INTO films_genres_request (film_id, genre_id) VALUES ($1, $2)',
                    [filmId, genreId]
                );
            }
        }

        await db.query('COMMIT');
        return { error: 0, status: 201, data: newFilmRequest };

    } catch (error) {
        await db.query('ROLLBACK');
        console.error("Erreur dans addFilmRequest:", error);
        return { error: 1, status: 500, data: "Erreur lors de la création de la requête" };
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
    const newid = await db.query('SELECT MAX(id) FROM projections');
    const id = newid.rows[0].max + 1;

    try {
        const res = await db.query('INSERT INTO projections (id, stand_id, film_id, date) VALUES ($1,$2,$3,$4) RETURNING *',[id,projection.idstand,projection.idfilm,projection.date]);
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

        await db.query('BEGIN');

        const filmReservations = await db.query(
            'DELETE FROM film_reservations WHERE projection_id = $1 RETURNING reservation_id',
            [id]
        );

        const reservationIds = filmReservations.rows.map(r => r.reservation_id);
        if (reservationIds.length > 0) {
            await db.query(
                'DELETE FROM reservations WHERE id = ANY($1)',
                [reservationIds]
            );
        }

        const res = await db.query('DELETE FROM projections WHERE id = $1 RETURNING *', [id]);

        await db.query('COMMIT');

        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression de la projection' };
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
        return {error: 0, status: 200, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des réservations des films'};
    } finally {
        db.release();
    }
}

async function getStandsByFilmId(filmId) {
    const db = await pool.connect();
    if (!filmId) {
        return { error: 1, status: 400, data: 'filmId manquant' };
    }
    try {
        const res = await db.query(
            `SELECT DISTINCT s.*
             FROM stands s
             JOIN projections p ON p.stand_id = s.id
             WHERE p.film_id = $1`,
            [filmId]
        );
        return { error: 0, status: 200, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des stands du film' };
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
    deleteProjection,
    getStandsByFilmId
}