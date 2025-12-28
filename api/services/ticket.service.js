import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";


async function getTicketsPrice() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM ticket_prices');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des tarifs de billets' };
    } finally {
        db.release();
    }
}

async function getBilletsByUserId(iduser){
    const db = await pool.connect();
    if (!iduser){
        return { error: 1, status: 400, data: 'iduser manquant' };
    }
    try {
        const res = await db.query('SELECT * FROM tickets where user_id =$1',[iduser]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des billets de l\'utiliateur' };
    } finally {
        db.release();
    }
}

async function createTicket(data){
    const db = await pool.connect();
    if (!data.iduser){
        return { error: 1, status: 400, data: "iduser manquant" };

    }
    if (!data.from){
        return { error: 1, status: 400, data: "date de début manquant" };
    }
    if (!data.to){
        return { error: 1, status: 400, data: "date de fin manquant" };
    }
    if (!data.idprice){
        return { error: 1, status: 400, data: "idprice manquant" };
    }

    try {
        const priceCheck = await db.query(
            'SELECT * FROM ticket_prices WHERE id = $1',
            [data.idprice]
        );
        if (priceCheck.rowCount === 0) {
            return { error: 1, status: 404, data: 'Tarif inexistant' };
        }


        const res = await db.query('INSERT INTO tickets (id,user_id,date_from,date_to,price_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [uuidv4(),data.iduser,data.from,data.to,data.idprice]);
        return { error: 0, status: 201, data:res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création du billet' };
    } finally {
        db.release();
    }
}


export default {
    getBilletsByUserId,
    getTicketsPrice,
    createTicket

}