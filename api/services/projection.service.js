import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getProjections() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM projections');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des projections' };
    } finally {
        db.release();
    }
}




export default {
    getProjections

}