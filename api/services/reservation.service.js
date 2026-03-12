import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getReservations() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM reservations');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des reservations' };
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





export default {
    getReservations, addFilmReservation
}