import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getSizes() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM sizes');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des tailles' };
    } finally {
        db.release();
    }
}

async function addSize(data){
    const db = await pool.connect();
    if (!data.label){
        return { error: 1, status: 400, data: 'label manquant' };
    }
    try {
        const check = await db.query('SELECT * FROM sizes where label=$1',[data.label]);
        if (check.rows.length >0){
            return { error: 1, status: 400, data:"Couleur deja existante" };
        }

        const newid = await db.query('SELECT MAX(id) FROM sizes');
        const newId = newid.rows[0].max +1;
        const add = await db.query('INSERT INTO sizes (id,label) values ($1,$2) RETURNING *',[newId,data.label]);
        return { error: 0, status: 201, data:add.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la taille' };
    } finally {
        db.release();
    }
}

export default {
    getSizes,
    addSize

}