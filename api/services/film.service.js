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
        return { error: 0, status: 200, data:res.rows };
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



export default {
    getFilms,
    getFilmsById,
    getFilmsCasts,
    getFilmsGenres

}