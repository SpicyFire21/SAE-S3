import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


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

async function getProviderRequests() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM provider_requests;');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des demandes de prestataires' };
    } finally {
        db.release();
    }
}

async function addProviderRequests(data) {
    const db = await pool.connect();

    try {
        if (!data.login || !data.password || !data.email || !data.email2)
            return { error: 1, status: 400, data: 'champs manquants' };

        if (data.email !== data.email2)
            return { error: 1, status: 400, data: 'emails différents' };

        const emailUser = await db.query(
            'SELECT 1 FROM users WHERE email = $1',
            [data.email]
        );
        if (emailUser.rowCount > 0)
            return { error: 1, status: 403, data: 'email déjà utilisé' };

        const emailRequest = await db.query(
            'SELECT 1 FROM provider_requests WHERE email = $1',
            [data.email]
        );
        if (emailRequest.rowCount > 0)
            return { error: 1, status: 409, data: 'demande déjà existante' };

        const res = await db.query(
            `INSERT INTO provider_requests
             (id, name, login, password, email, email2, droit)
             VALUES ($1,$2,$3,$4,$5,$6,$7)
             RETURNING *`,
            [uuidv4(), data.name, data.login, data.password, data.email, data.email2, data.droit]
        );

        return { error: 0, status: 201, data: res.rows[0] };

    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur création demande prestataire' };
    } finally {
        db.release();
    }
}


async function deleteProviderRequests(id) {
    const db = await pool.connect();
    if (!id){
        return { error: 1, status: 400, data: 'id manquant' };
    }
    try {
        const res = await db.query('DELETE FROM provider_requests WHERE id = $1 RETURNING *', [id]);

        return { error: 0, status: 200, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression de la demande de prestataire' };
    } finally {
        db.release();
    }
}

export default {
    getProviders,
    getProviderRequests,
    addProviderRequests,
    deleteProviderRequests

}