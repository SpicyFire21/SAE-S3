import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getColors() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM colors');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des couleurs' };
    } finally {
        db.release();
    }
}

async function addColor(data){
    const db = await pool.connect();
    if (!data.label){
        return { error: 1, status: 400, data: 'label manquant' };
    }
    try {
        const check = await db.query('SELECT * FROM colors where label=$1',[data.label]);
        if (check.rows.length >0){
            return { error: 1, status: 400, data:"Couleur deja existante" };
        }

        const newid = await db.query('SELECT MAX(id) FROM colors');
        const newId = newid.rows[0].max +1;

        const add = await db.query('INSERT INTO colors (id,label) values ($1,$2) RETURNING *',[newId,data.label]);
        return { error: 0, status: 200, data:add.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la couleur' };
    } finally {
        db.release();
    }
}


export default {
    getColors,
    addColor

}