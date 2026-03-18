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
    const db = await pool.connect();

    if(!id){
        return { error: 1, status: 400, data: 'id manquant' }
    }

    try {
        // a finir
        return { error: 0, status: 200, data:[] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: "Erreur lors de la récupération des events via reservation" };
    } finally {
        db.release();
    }
}




export default {
    getReservations,
    getEventFromReservation
}