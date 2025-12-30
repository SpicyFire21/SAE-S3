import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";


async function getNotes() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM notes');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des notes' };
    } finally {
        db.release();
    }
}

async function getNoteById(id){
    const db = await pool.connect();
    if (!id) return { error: 1, status: 400, data: 'id manquant' };

    try {
        const res = await db.query('SELECT * FROM notes where id=$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération de la note' };
    } finally {
        db.release();
    }
}

async function deleteNote(id){
    const db = await pool.connect();
    if (!id) return { error: 1, status: 400, data: 'id manquant' };

    try {
        const res = await db.query('DELETE FROM notes where id =$1  RETURNING *',[id]);
        return { error: 0, status: 204, data:"Note Supprimé" };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression de la note' };
    } finally {
        db.release();
    }
}

async function addNote(data){
    const db = await pool.connect();
    if (!data.value) return { error: 1, status: 400, data: 'value manquant' };
    if (!data.iduser) return { error: 1, status: 400, data: 'iduser manquant' };


    try {

        const newid = await db.query('SELECT MAX(id) FROM notes');
        const id = newid.rows[0].max +1;

        const result = await db.query('INSERT INTO notes (id,user_id,value) VALUES ($1,$2,$3) RETURNING *',
            [id,data.iduser,data.value])

        return { error: 0, status: 201, data: result.rows[0] };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: "erreur lors de la création d'une note" };
    } finally {
        db.release();
    }
}

export default {
    getNotes,
    deleteNote,
    addNote,
    getNoteById

}