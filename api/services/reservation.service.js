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



async function getEventFromReservation(id) {
    // cest pas tres tres opti mais on part du principe qu'on a max 2 ou 3 types de stands
    const db = await pool.connect();

    if (!id) {
        return { error: 1, status: 400, data: 'id manquant' };
    }

    try {
        const reservationRes = await db.query(
            'SELECT * FROM reservations WHERE id = $1',
            [id]
        );

        if (reservationRes.rowCount === 0) {
            return { error: 1, status: 404, data: 'reservation inexistante' };
        }

        const reservation = reservationRes.rows[0];

        if (reservation.type === 'film') {

            const filmRes = await db.query(
                'SELECT * FROM film_reservations WHERE reservation_id = $1',
                [id]
            );

            if (filmRes.rowCount === 0) {
                return { error: 1, status: 404, data: 'Réservation film introuvable' };
            }

            const projectionRes = await db.query(
                'SELECT * FROM projections WHERE id = $1',
                [filmRes.rows[0].projection_id]
            );

            if (projectionRes.rowCount === 0) {
                return { error: 1, status: 404, data: 'Projection introuvable' };
            }

            const filmResFinal = await db.query(
                'SELECT * FROM films WHERE id = $1',
                [projectionRes.rows[0].film_id]
            );

            if (filmResFinal.rowCount === 0) {
                return { error: 1, status: 404, data: 'Film introuvable' };
            }

            return {
                error: 0,
                status: 200,
                type: 'film',
                data: filmResFinal.rows[0]
            };

        } else if (reservation.type === 'autograph') {

            const autographRes = await db.query(
                'SELECT * FROM autograph_reservations WHERE reservation_id = $1',
                [id]
            );

            if (autographRes.rowCount === 0) {
                return { error: 1, status: 404, data: 'Réservation autograph introuvable' };
            }

            const autographFinal = await db.query(
                'SELECT * FROM autographs WHERE id = $1',
                [autographRes.rows[0].autograph_id]
            );

            if (autographFinal.rowCount === 0) {
                return { error: 1, status: 404, data: 'Autograph introuvable' };
            }

            return {
                error: 0,
                status: 200,
                type: 'autograph',
                data: autographFinal.rows[0]
            };

        } else {
            return { error: 1, status: 400, data: 'Type de réservation inconnu' };
        }

    } catch (error) {
        console.error(error);
        return {
            error: 1,
            status: 500,
            data: "Erreur lors de la récupération des events via reservation"
        };
    } finally {
        db.release();
    }
}



export default {
    getReservations,
    getEventFromReservation
}