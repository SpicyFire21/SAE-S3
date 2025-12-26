import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";
import {getAllBasketByUserId, getBasketItems} from "../controller/basket.controller.js";


async function getAllBasketItems() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM basket_items');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des items des paniers' };
    } finally {
        db.release();
    }
}

async function getAllBasketByUserId(iduser) {
    const db = await pool.connect();

    if (!iduser){
        return { error: 1, status: 400, data: 'iduser manquant' }
    }

    try {
        const res = await db.query('SELECT * FROM basket_items where user_id = $1',[iduser]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des items des paniers' };
    } finally {
        db.release();
    }
}

async function getBasketItems(idbasket) {
    const db = await pool.connect();

    if (!idbasket){
        return { error: 1, status: 400, data: 'idbasket manquant' }
    }

    try {
        const check = await db.query('SELECT * FROM baskets where id = $1',[idbasket]);
        if (check.rows.length === 0) {return { error: 1, status: 404, data: 'panier inexistant' };}

        const res = await db.query('SELECT * FROM basket_items where basket_id = $1',[idbasket]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des items des paniers' };
    } finally {
        db.release();
    }
}


async function getBasketByUserId(iduser){
    const db = await pool.connect();
    if (!iduser){
        return { error: 1, status: 400, data: 'iduser manquant' }
    }
    const currentDate = new Date().toISOString();
    try {
        const check = await db.query('SELECT * FROM users where id = $1',[iduser]);
        if (check.rows.length === 0) {return { error: 1, status: 404, data: 'utilisateur inexistant' };}

        const res = await db.query('SELECT * FROM baskets where user_id = $1 and state = $2',[iduser,"wait"]);
        if (res.rows.length === 0 ){
            const newbasket = await db.query('INSERT INTO baskets (id,user_id,date,state) values ($1,$2,$3,$4) RETURNING *',[uuidv4(),iduser,currentDate,"wait"])
            return { error: 0, status: 201, data:newbasket.rows };
        }



        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des items des paniers' };
    } finally {
        db.release();
    }
}

async function addBasketItems(data) {
    const db = await pool.connect();

    if(!data.idbasket ){
        return { error: 1, status: 400, data: 'idbasket manquant' }
    }
    if(!data.idgoodie){
        return { error: 1, status: 400, data: 'idgoodie manquant' }
    }
    if(!data.idcolor ){
        return { error: 1, status: 400, data: 'idcolor manquant' }
    }
    if(!data.idsize){
        return { error: 1, status: 400, data: 'idsize manquant' }
    }
    if (!Number.isInteger(data.count) || data.count <= 0)
        return { error: 1, status: 400, data: "count invalide" };


    try {
        const res = await db.query('SELECT * FROM basket_items where basket_id =$1 and goodie_id = $2 and color_id = $3 and size_id = $4',
            [data.idbasket,data.idgoodie,data.idcolor,data.idsize]);

        if (res.rows.length === 0){
            //add
            const add = await db.query('INSERT INTO basket_items (basket_id,goodie_id,color_id,size_id,count) values ($1,$2,$3,$4,$5) RETURNING *',
                [data.idbasket,data.idgoodie,data.idcolor,data.idsize,data.count])
            return { error: 0, status: 200, data:add.rows[0] };
        } else {
            //update
            const update = await db.query(
                `UPDATE basket_items
                 SET count = count + $1
                 WHERE basket_id = $2 AND goodie_id = $3 AND color_id = $4 AND size_id = $5
                 RETURNING *`,
                [data.count, data.idbasket, data.idgoodie, data.idcolor, data.idsize]
            );
            return { error: 0, status: 200, data: update.rows[0] };
        }



    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de l\'items au panier' };
    } finally {
        db.release();
    }
}


async function payOrder(idbasket){
    const db = await pool.connect();
    if(!idbasket ){
        return { error: 1, status: 400, data: 'idbasket manquant' }
    }
    try {
        const res = await db.query('SELECT * FROM baskets where id=$1 and state = $2',[idbasket,"wait"]);
        if (res.rows.length === 0){
            return { error: 1, status: 404, data:"panier inexistant" };
        }
        const update = await db.query('UPDATE baskets SET state = $1 WHERE id = $2 RETURNING *',["payed",idbasket])
        return { error: 0, status: 200, data:update.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des items des paniers' };
    } finally {
        db.release();
    }
}

export default {
    getAllBasketItems,
    getAllBasketByUserId,
    getBasketItems,
    getBasketByUserId,
    addBasketItems,
    payOrder,



}