import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getAutographs() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM autographs');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des autographs' };
    } finally {
        db.release();
    }
}

async function getAutographsById(id){
    const db = await pool.connect();
    if (!id){
        return { error: 1, status: 400, data: 'id manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM autographs where id =$1',[id]);
        return { error: 0, status: 200, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des autographs par id' };
    } finally {
        db.release();
    }
}

async function getAutographsByStandId(idstand){
    const db = await pool.connect();
    if (!idstand){
        return { error: 1, status: 400, data: 'idstand manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM autographs where stand_id =$1',[idstand]);
        return { error: 0, status: 200, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des autographs par id de stand' };
    } finally {
        db.release();
    }
}

async function addAutograph(autograph){
    const db = await pool.connect();
    if (!autograph.idstand){
        return { error: 1, status: 400, data: 'idstand manquant' };
    }
    if (!autograph.iduser){
        return { error: 1, status: 400, data: 'iduser manquant' };
    }
    if (!autograph.begindate){
        return { error: 1, status: 400, data: 'begindate manquant' };
    }
    if (!autograph.duration){
        return { error: 1, status: 400, data: 'duration manquant' };
    }


    try {
        const res = await db.query('INSERT INTO autographs (id, stand_id, user_id, begin_date, duration) VALUES ($1,$2,$3,$4,$5)',
            [uuidv4(),autograph.idstand,autograph.iduser,autograph.begindate,autograph.duration]);
        return { error: 0, status: 201, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création de l\'autograph' };
    } finally {
        db.release();
    }
}

async function editAutograph(autograph){
    const db = await pool.connect();
    if (!autograph.idstand){
        return { error: 1, status: 400, data: 'idstand manquant' };
    }
    if (!autograph.iduser){
        return { error: 1, status: 400, data: 'iduser manquant' };
    }
    if (!autograph.begindate){
        return { error: 1, status: 400, data: 'begindate manquant' };
    }
    if (!autograph.duration){
        return { error: 1, status: 400, data: 'duration manquant' };
    }
    if (!autograph.id){
        return { error: 1, status: 400, data: 'id manquant' };
    }


    try {
        // fonction a finir ....
        const res = await db.query('UPDATE autographs SET duration = $5,begin_date=$4, ',
            [autograph.id,autograph.idstand,autograph.iduser,autograph.begindate,autograph.duration]);
        return { error: 0, status: 201, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création de l\'autograph' };
    } finally {
        db.release();
    }
}

async function deleteAutograph(autograph){
    const db = await pool.connect();
    if (!autograph.id){
        return { error: 1, status: 400, data: 'id manquant' };
    }


    try {

    const res = await db.query('DELETE FROM autographs WHERE id = $1 RETURNING *',
            [autograph.id]);
        return { error: 0, status: 201, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création de l\'autograph' };
    } finally {
        db.release();
    }
}


export default {
    getAutographs,
    getAutographsById,
    getAutographsByStandId,
    addAutograph,
    editAutograph,
    deleteAutograph

}