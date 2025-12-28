import pool from '../database/db.js';
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';

let salt = 10;

async function getUsers() {
    const db = await pool.connect();
    try {
        const res = await db.query('SELECT * FROM users');
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des utilisateurs' };
    } finally {
        db.release();
    }
}

async function getUsersById(id){
    const db = await pool.connect();
    if (!id) return { error: 1, status: 400, data: 'id manquant' };

    try {
        const res = await db.query('SELECT * FROM users where id=$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération de l\'utilisateur' };
    } finally {
        db.release();
    }
}

async function addUser(data){
    const db = await pool.connect();
    if ((!data.login) || (!data.password)) return { error: 1, status: 400, data: 'login et/ou mot de passe manquant' };
    if (!data.email) return { error: 1, status: 400, data: 'email manquant' };
    if (data.droit === undefined || data.droit === null) {
        return { error: 1, status: 400, data: 'droit manquant' };
    }    if (data.droit === "1" && !data.type) {
        return {error: 1, status: 400, data: 'type manquant'};
    }

    try {
        const pseudoExist = await db.query('SELECT * FROM users WHERE users.login=$1',[data.login]);
        if (pseudoExist.rows.length > 0) {return { error: 1, status: 400, data: 'login deja utilisé' };}

        const emailExist = await db.query('SELECT * FROM users WHERE users.email=$1',[data.email]);
        if (emailExist.rows.length > 0) {return { error: 1, status: 400, data: 'Email deja utilisé' };}

        const hashedpassword = await bcrypt.hash(data.password, salt);

        const result = await db.query('INSERT INTO users (id,name,login,password,email,droit,session,type,nom_photo,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
            [uuidv4(),data.name,data.login,hashedpassword,data.email,data.droit,data.session,data.type,data.nom_photo,data.description])

        return { error: 0, status: 201, data: result.rows[0] };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: "erreur lors de la création d'un utilisateur" };
    } finally {
        db.release();
    }
}

async function login(data){
    const db = await pool.connect();
    if ((!data.login) || (!data.password)) return { error: 1, status: 400, data: 'login et/ou mot de passe manquant' };


    try {
        const check = await db.query('SELECT * FROM users WHERE users.login=$1',[data.login]);
        if (check.rows.length === 0) {
            return {error: 1, status: 404, data: 'login et/ou mot de passe incorrect'};
        }
        let user = check.rows[0];
        let passwordMatch = bcrypt.compareSync(data.password, user.password);

        if (!passwordMatch) {
            return { error: 1, status: 404, data: 'login et/ou mot de passe incorrect' };
        }

        return { error: 0, status: 200, data: check.rows[0] };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: "erreur lors de la création d'un utilisateur" };
    } finally {
        db.release();
    }
}



export default {
    getUsers,
    addUser,
    login,
    getUsersById

}