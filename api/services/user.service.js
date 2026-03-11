import pool from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js"
import { v4 as uuidv4 } from "uuid";


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

async function login(data,meta){
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

        let jti = uuidv4()
        const sessionId = uuidv4();
        console.log(meta)
        const accessToken = await jwtConfig.createAccessToken(user,user.droit)
        const refreshToken = await jwtConfig.createRefreshToken(jti,user)
        const savePayload = {
            id: user.id,
            jti,
            refreshToken,
            sessionId,
            ip: meta.ip,
            userAgent: meta.userAgent,
            expiresAt: meta.expiresAt,
            db
        }
        await jwtConfig.saveToken(savePayload);


        return { error: 0, status: 200, data: {
                accessToken,
                refreshToken
            } };
    } catch (error){
        console.error(error);
        return { error: 1, status: 500, data: "erreur lors de la connexion de l'utilisateur" };
    } finally {
        db.release();
    }
}

async function getNotesByUserId(id){
    const db = await pool.connect();
    if (!id) return { error: 1, status: 400, data: 'id manquant' };

    try {
        const res = await db.query('SELECT * FROM notes where user_id=$1',[id]);
        return { error: 0, status: 200, data:res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des notes de l\'utilisateur' };
    } finally {
        db.release();
    }
}

async function logout(refreshToken) {
    const db = await pool.connect();
    const payload = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret);

    try {
        await jwtConfig.deleteTokenByJti(db,payload.jti);
        return { error: 0, status: 200, data:"Deconnexion réussi" };
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la deconnexion de l\'utilisateur'};
    } finally {
        db.release();
    }
}

async function refreshToken(token){
    if (!token) {

        return {error: 1, status: 401, data: "Le jeton d'actualisation est requis!"};
    }
    const db = await pool.connect();
    try {
        let payload = jwt.verify(token,jwtConfig.refreshTokenSecret)
        if (!payload) {

            return {error: 1, status: 403, data: "Le jeton d'actualisation n'est pas valide!"};
        }

        const valid = await jwtConfig.existsToken(db,{ jti: payload.jti, token: token });

        if (!valid) {

            return {error: 1, status: 403, data: "Le jeton d'actualisation n'est pas dans la base de données!"};

        }
        let newJTI = uuidv4()

        const getDetails = await db.query(`SELECT session_id, ip, user_agent, expires_at FROM refresh_tokens WHERE jti = $1`,
            [payload.jti])

        payload = {
            ...payload,
            sessionId:getDetails.rows[0].session_id,
            ip:getDetails.rows[0].ip,
            userAgent:getDetails.rows[0].user_agent,
            expiresAt:getDetails.rows[0].expires_at
        }



        let result = await jwtConfig.createAccessRefreshTokens(newJTI,payload,db);
        await jwtConfig.deleteTokenByJti(db,payload.jti);
        return {error: 0, status: 200, data: result};

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return {
                error: 1,
                status: 401,
                data: 'Refresh token expiré'
            }
        }

        console.error(err)
        return {
            error: 1,
            status: 500,
            data: 'Erreur interne'
        }
    } finally {
        db.release();
    }
}


export default {
    getUsers,
    addUser,
    login,
    getUsersById,
    getNotesByUserId,
    logout,
    refreshToken
}