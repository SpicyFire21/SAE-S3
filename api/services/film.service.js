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

async function getFilmDirector(iddirector){
    const db = await pool.connect();
    if (!iddirector){
        return { error: 1, status: 400, data: 'iddirector manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM users where id =$1',[iddirector]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération du directeur du film' };
    } finally {
        db.release();
    }
}


export default {
    getFilms,
    getFilmDirector

}