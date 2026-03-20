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
        return { error: 0, status: 200, data:res.rows };
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
        const res = await db.query('INSERT INTO autographs (id, stand_id, user_id, begin_date, duration) VALUES ($1,$2,$3,$4,$5) RETURNING *',
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

        const res = await db.query('UPDATE autographs SET duration = $5,begin_date=$4,user_id=$3 where id=$1 and stand_id=$2; ',
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

async function getAutographsReservations() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM autograph_reservations');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations des autographes' };
    } finally {
        db.release();
    }
}

async function addAutographsReservations(data) {
    const db = await pool.connect();

    if (!data.iduser) return { error: 1, status: 400, data: 'iduser manquant' };
    if (!data.type) return { error: 1, status: 400, data: 'type manquant' };
    if (!data.date) return { error: 1, status: 400, data: 'date manquant' };
    if (!data.idstand) return { error: 1, status: 400, data: 'idstand manquant' };
    if (!data.idautograph) return { error: 1, status: 400, data: 'idautograph manquant' };

    try {
        await db.query('BEGIN');

        const { rows } = await db.query('SELECT max(id) FROM reservations');
        const newId = rows[0].max + 1;

        const reservationResult = await db.query(
            'INSERT INTO reservations (id, user_id, date, stand_id, type) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [newId, data.iduser, data.date, data.idstand, data.type]
        );
        const reservation = reservationResult.rows[0];

        const autographReservationResult = await db.query(
            'INSERT INTO autograph_reservations (reservation_id, autograph_id) VALUES ($1,$2) RETURNING *',
            [reservation.id, data.idautograph]
        );
        const autographReservation = autographReservationResult.rows[0];

        await db.query('COMMIT');
        return { error: 0, status: 201, data: { reservation, autographReservation } };

    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        return { error: 1, status: 500, data: "Erreur lors de l'ajout de la réservation de l'autograph" };
    } finally {
        db.release();
    }
}

export default {
    getAutographs,
    getAutographsById,
    getAutographsByStandId,
    getAutographsReservations,
    addAutographsReservations,
    addAutograph,
    editAutograph,
    deleteAutograph

}