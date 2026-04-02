import pool from '../database/db.js';
import {v4 as uuidv4} from "uuid";


async function getStands() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM stands');
        return {error: 0, status: 200, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des stands'};
    } finally {
        db.release();
    }
}

async function getStandsById(id) {
    const db = await pool.connect();
    if (!id) {
        return {error: 1, status: 400, data: "id manquant"};
    }
    try {
        const res = await db.query('SELECT * FROM stands where id =$1', [id]);
        return {error: 0, status: 200, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des stands'};
    } finally {
        db.release();
    }
}

async function getStandsTypes() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM stand_types');
        return {error: 0, status: 200, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des types de stands'};
    } finally {
        db.release();
    }
}

async function getStandTypeById(idtype) {
    const db = await pool.connect();
    if (!idtype) {
        return {error: 1, status: 400, data: "idtype manquant"};
    }
    try {
        const res = await db.query('SELECT * FROM stand_types where id =$1', [idtype]);
        return {error: 0, status: 200, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des types de stands par id'};
    } finally {
        db.release();
    }
}

async function getStandsReservationsRequests() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM stand_reservation_requests');
        return {error: 0, status: 200, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des requêtes de stands'};
    } finally {
        db.release();
    }
}

async function addStandRequest(data) {
    const db = await pool.connect();

    if (!data.idstand) {
        return {error: 1, status: 400, data: "idstand manquant"};
    }
    if (!data.iduser) {
        return {error: 1, status: 400, data: "iduser manquant"};
    }
    if (!data.status) {
        return {error: 1, status: 400, data: "status manquant"};
    }
    try {

        const checkUser = await db.query('SELECT * FROM users WHERE id=$1',[data.iduser]);
        if (checkUser.rows.length === 0) {
            return {error: 1, status: 404, data: "Cet utilisateur n'existe pas"};
        }
        const allowedStatus = ["pending", "accepted", "rejected"];

        if (!allowedStatus.includes(data.status)) {
            return {error: 1, status: 400, data: "status invalide"};
        }


        const newid = await db.query('SELECT MAX(id) FROM stand_reservation_requests');
        const id = newid.rows[0].max + 1;

        const currentDate = new Date().toISOString();

        const res = await db.query('INSERT INTO stand_reservation_requests (id,request_date,stand_id,user_id,status) values ($1,$2,$3,$4,$5) RETURNING *',
            [id, currentDate, data.idstand, data.iduser, data.status]);
        return {error: 0, status: 201, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de l\'ajout d\'un requête de stands'};
    } finally {
        db.release();
    }
}

async function removeStandRequest(reservationId) {
    const db = await pool.connect();

    if (!reservationId) {
        return {error: 1, status: 400, data: "idreservation manquant"};
    }

    try {
        const {rows} = await db.query('SELECT * FROM stand_reservation_requests WHERE id = $1', [reservationId]);

        if (rows.length === 0) {
            return {error: 1, status: 404, data: "Cette reservation n'existe plus"};
        }


        const res = await db.query('DELETE FROM stand_reservation_requests WHERE id = $1 RETURNING *', [reservationId]);
        return {error: 0, status: 200, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de l\'ajout d\'un requête de stands'};
    } finally {
        db.release();
    }
}

async function editStandRequest(payload) {
    const db = await pool.connect();

    if (!payload.idreservation) {
        return {error: 1, status: 400, data: "idreservation manquant"};
    }
    try {

        const checkRequests = await db.query('SELECT * FROM stand_reservation_requests WHERE id = $1', [payload.idreservation]);
        if (checkRequests.rows.length === 0) {
            return {error: 1, status: 404, data: "Cette reservation n'existe plus"};
        }

        const st = checkRequests.rows[0];

        const editStand = await db.query('UPDATE stands SET owner_id = $1 WHERE id=$2 RETURNING *',[st.user_id,st.stand_id])
        if (editStand.rows.length === 0) {
            return {error: 1, status: 404, data: "Erreur lors de la mise a jour du stand"};
        }

        const editStandRequest = await db.query('UPDATE stand_reservation_requests SET status=$2 WHERE id = $1 RETURNING *', [payload.idreservation,"accepted"]);
        return {error: 0, status: 200, data: editStandRequest.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de l\'ajout d\'un requête de stands'};
    } finally {
        db.release();
    }
}

export default {
    getStands,
    getStandsById,
    getStandsTypes,
    getStandTypeById,
    getStandsReservationsRequests,
    addStandRequest,
    removeStandRequest,
    editStandRequest
}