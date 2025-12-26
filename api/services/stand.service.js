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

export default {
    getStands,
    getStandsById,
    getStandsTypes,
    getStandTypeById

}