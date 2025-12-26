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

async function addProviderRequests(data){
    const db = await pool.connect();

    if (!data.login){
        return { error: 1, status: 400, data: 'login manquant' };
    }
    if (!data.password){
        return { error: 1, status: 400, data: 'password manquant' };
    }
    if (!data.email){
        return { error: 1, status: 400, data: 'email manquant' };
    }
    if (!data.email2){
        return { error: 1, status: 400, data: 'confirmez votre email' };
    }

    if (data.email !== data.email2){
        return { error: 1, status: 400, data: 'email différents' };
    }
    const currentDate = new Date().toISOString();
    try {
        const check = await db.query('SELECT * FROM users where email=$1',[data.email])
        if(check){
            return {error:1,status:403,data:"email dejà utilisé"}
        }
        const res = await db.query('INSERT INTO providers_requests (id,name,login,password,email,email2,droit,date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
            [uuidv4(),data.name,data.login,data.password,data.email,data.email2,data.droit,currentDate]);
        return { error: 0, status: 201, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création de la demande de prestataire' };
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
        const res = await db.query('DELETE FROM providers_requests WHERE id = $1 RETURNING *', [id]);

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