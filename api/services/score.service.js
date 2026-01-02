import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getScores() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM votes_score');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des scores' };
    } finally {
        db.release();
    }
}



export default {
    getScores,


}