import pool from '../database/db.js';


async function getProviders() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM users where droit =1');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des prestataires' };
    } finally {
        db.release();
    }
}

export default {
    getProviders

}