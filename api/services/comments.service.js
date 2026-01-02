import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";


async function getComments() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM comments_golden_book');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des commentaires' };
    } finally {
        db.release();
    }
}

async function addComments(data){
    const db = await pool.connect();

    if (!data.iduser) return { error: 1, status: 400, data: 'iduser manquant' };
    if (!data.content) return { error: 1, status: 400, data: 'content manquant' };

    const currentDate = new Date().toISOString();

    try {


        const result = await db.query('INSERT INTO comments_golden_book (id,user_id,content,date) VALUES ($1,$2,$3,$4) RETURNING *',
            [uuidv4(),data.iduser,data.content,currentDate])

        return { error: 0, status: 201, data: result.rows[0] };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: "erreur lors de la création d'un commentaire" };
    } finally {
        db.release();
    }
}



export default {
    getComments,
    addComments
}