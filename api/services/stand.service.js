import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getStands() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM stands');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des stands' };
    } finally {
        db.release();
    }
}

async function getStandsById(id) {
    const db = await pool.connect();
    if(!id){
        return { error: 1, status: 400, data:"id manquant" };
    }
    try {
        const res = await db.query('SELECT * FROM stands where id =$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des stands' };
    } finally {
        db.release();
    }
}

async function getStandsTypes(){
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM stand_types');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des types de stands' };
    } finally {
        db.release();
    }
}

async function getStandTypeById(idtype) {
    const db = await pool.connect();
    if(!idtype){
        return { error: 1, status: 400, data:"idtype manquant" };
    }
    try {
        const res = await db.query('SELECT * FROM stand_types where id =$1',[idtype]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des types de stands par id' };
    } finally {
        db.release();
    }
}

async function getStandsReservationsRequests() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM stand_reservation_requests');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des requêtes de stands' };
    } finally {
        db.release();
    }
}

async function addStandRequest(data) {
    const db = await pool.connect();

    if(!data.idstand) {
        return { error: 1, status: 400, data:"idstand manquant"};
    }
    if(!data.iduser) {
        return { error: 1, status: 400, data:"iduser manquant"};
    }
    if(!data.status) {
        return { error: 1, status: 400, data:"status manquant"};
    }

    const newid = await db.query('SELECT MAX(id) FROM stand_reservation_requests');
    const id = newid.rows[0].max +1;

    const currentDate = new Date().toISOString();
    try {
        const res = await db.query('INSERT INTO stand_reservation_requests (id,request_date,stand_id,user_id,status) values ($1,$2,$3,$4,$5) RETURNING *',
            [id,currentDate,data.idstand,data.iduser,data.status]);
        return { error: 0, status: 201, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout d\'un requête de stands' };
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
    addStandRequest

}