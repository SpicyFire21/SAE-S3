import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getGenres() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM genres');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des genres' };
    } finally {
        db.release();
    }
}

async function getGenresById(id){
    const db = await pool.connect();
    if (!id){
        return { error: 1, status: 400, data: 'id manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM genres where id =$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des genres par id' };
    } finally {
        db.release();
    }
}



export default {
    getGenres,
    getGenresById


}