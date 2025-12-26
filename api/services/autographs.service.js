import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getAutographs() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM autographs');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des autographs' };
    } finally {
        db.release();
    }
}

async function getAutographsById(id){
    const db = await pool.connect();
    if (!id){
        return { error: 1, status: 400, data: 'id manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM autographs where id =$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des autographs par id' };
    } finally {
        db.release();
    }
}

async function getAutographsByStandId(idstand){
    const db = await pool.connect();
    if (!idstand){
        return { error: 1, status: 400, data: 'idstand manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM autographs where stand_id =$1',[idstand]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des autographs par id de stand' };
    } finally {
        db.release();
    }
}


export default {
    getAutographs,
    getAutographsById,
    getAutographsByStandId

}