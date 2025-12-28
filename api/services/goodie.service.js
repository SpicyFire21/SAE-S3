import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";




async function getGoodies() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM goodies');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des goodies' };
    } finally {
        db.release();
    }
}

async function getGoodiesByProviderId(id) {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM goodies where owner_id =$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des goodies du prestataire' };
    } finally {
        db.release();
    }
}

async function getGoodiesColors() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM goodies_colors ');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des couleurs des goodies' };
    } finally {
        db.release();
    }
}

async function getGoodiesSizes() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM goodies_sizes ');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des tailles des goodies' };
    } finally {
        db.release();
    }
}

async function addGoodies(data){
    const db = await pool.connect();
    if (!data.iduser) {
        return { error: 1, status: 400, data: 'iduser manquant' };
    }

    if (!data.name) {
        return { error: 1, status: 400, data: 'name manquant' };
    }
    if (!data.price) {
        return { error: 1, status: 400, data: 'price manquant' };
    }
    if (!data.quantity) {
        return { error: 1, status: 400, data: 'quantity manquant' };
    }
    try {
        const newid = await db.query('SELECT MAX(id) FROM goodies');
        const newId = newid.rows[0].max +1;


        const res = await db.query('INSERT INTO goodies (id,owner_id,name,price,quantity) values ($1,$2,$3,$4,$5) RETURNING *'
            ,[newId,data.iduser,data.name,data.price,data.quantity]);
        return { error: 0, status: 201, data:res.rows };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout du goodie' };
    }finally {
        db.release();
    }
}

async function editGoodies(data,iduser){
    const db = await pool.connect();
    if (!iduser) {
        return { error: 1, status: 400, data: 'iduser manquant' };
    }
    if (!data.id) {
        return { error: 1, status: 400, data: 'id manquant' };
    }
    if (!data.name) {
        return { error: 1, status: 400, data: 'name manquant' };
    }if (!data.price) {
        return { error: 1, status: 400, data: 'price manquant' };
    }
    if (!data.quantity) {
        return { error: 1, status: 400, data: 'quantity manquant' };
    }




    try {
        const res = await db.query('UPDATE goodies SET name = $3,price = $4,quantity = $5 WHERE id = $1 and owner_id = $2 RETURNING *'
            ,[data.id,iduser,data.name,data.price,data.quantity]);
        return { error: 0, status: 200, data:res.rows[0] };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout du goodie' };
    }finally {
        db.release();
    }
}

async function removeGoodiesColors(idgoodie){
    const db = await pool.connect();
    if (!idgoodie) {
        return { error: 1, status: 400, data: 'idgoodie manquant' };
    }

    try {
        const res = await db.query('DELETE FROM goodies_colors where goodie_id = $1 RETURNING *'
            ,[idgoodie]);
        return { error: 0, status: 204, data:res.rows };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression des couleurs du goodie' };
    }finally {
        db.release();
    }
}

async function removeGoodiesSizes(idgoodie){
    const db = await pool.connect();
    if (!idgoodie) {
        return { error: 1, status: 400, data: 'idgoodie manquant' };
    }

    try {
        const res = await db.query('DELETE FROM goodies_sizes where goodie_id = $1 RETURNING *'
            ,[idgoodie]);
        return { error: 0, status: 204, data:res.rows };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression des tailles du goodie' };
    }finally {
        db.release();
    }
}

async function addGoodiesColors(data){
    const db = await pool.connect();
    console.log(data)
    if (!data.idgoodie) {
        return { error: 1, status: 400, data: 'idgoodie manquant' };
    }
    if (!data.idcolor) {
        return { error: 1, status: 400, data: 'idcolor manquant' };
    }

    try {
        const check = await db.query('SELECT * FROM goodies where id=$1',[data.idgoodie]);
        if (check.rows.length === 0){
            return { error: 1, status: 404, data:"goodies inexistant" };
        }

        const check2 = await db.query('SELECT * FROM colors where id=$1',[data.idcolor]);
        if (check2.rows.length === 0){
            return { error: 1, status: 404, data:"couleur inexistante" };
        }


        const check3 = await db.query('SELECT * FROM goodies_colors where goodie_id=$1 and color_id=$2',[data.idgoodie,data.idcolor]);
        if (check3.rows.length > 0){
            return { error: 1, status: 400, data:"le goodie existe déjà avec cette couleur" };
        }


        const res = await db.query('INSERT INTO goodies_colors(goodie_id,color_id) values ($1,$2) RETURNING *'
            ,[data.idgoodie,data.idcolor]);
        return { error: 0, status: 201, data:res.rows };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la couleur du goodie' };
    }finally {
        db.release();
    }
}

async function addGoodiesSizes(data){
    const db = await pool.connect();
    if (!data.idgoodie) {
        return { error: 1, status: 400, data: 'idgoodie manquant' };
    }
    if (!data.idsize) {
        return { error: 1, status: 400, data: 'idsize manquant' };
    }

    try {
        const check = await db.query('SELECT * FROM goodies where id=$1',[data.idgoodie]);
        if (check.rows.length === 0){
            return { error: 1, status: 404, data:"goodies inexistant" };
        }

        const check2 = await db.query('SELECT * FROM sizes where id=$1',[data.idsize]);
        if (check2.rows.length === 0){
            return { error: 1, status: 404, data:"taille inexistante" };
        }

        const check3 = await db.query('SELECT * FROM goodies_sizes where goodie_id=$1 and size_id=$2',[data.idgoodie,data.idsize]);
        if (check3.rows.length > 0){
            return { error: 1, status: 400, data:"le goodie existe déjà avec cette taille" };
        }

        const res = await db.query('INSERT INTO goodies_sizes(goodie_id,size_id) values ($1,$2) RETURNING *'
            ,[data.idgoodie,data.idsize]);
        return { error: 0, status: 201, data:res.rows };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la taille du goodie' };
    }finally {
        db.release();
    }
}

export default {
    getGoodies,
    getGoodiesByProviderId,
    getGoodiesColors,
    getGoodiesSizes,
    addGoodies,
    editGoodies,
    removeGoodiesColors,
    removeGoodiesSizes,
    addGoodiesColors,
    addGoodiesSizes


}