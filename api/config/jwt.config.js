import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import crypto from "crypto";



const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const jwtExpiration = 60 * 10;                  // 10 minutes
const jwtRefreshExpiration = 60 * 60 * 24 * 7; // 7 jours


const hashToken = token =>
    crypto.createHash("sha256").update(token).digest("hex");

const saveToken = async ({id, jti, refreshToken, sessionId, ip, userAgent, expiresAt, db}) => {
    await db.query(`INSERT INTO refresh_tokens(iduser, jti, token_hash, session_id, ip, user_agent, expires_at)VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [id, jti, hashToken(refreshToken), sessionId, ip, userAgent, expiresAt]);
};



const existsToken = async (db,{ jti, token }) => {
    const res = await db.query(
        `SELECT 1 FROM refresh_tokens WHERE jti = $1 AND token_hash = $2 AND expires_at > NOW()`,
        [jti, hashToken(token)]
    );
    return res.rowCount === 1;
};

const deleteTokenByJti = async (db,jti) => {
    await db.query(`DELETE FROM refresh_tokens WHERE jti=$1`, [jti]);
};


const createAccessRefreshTokens = async (jti, payload,db) => {

    const newPayload = {
        id: payload.id,
        pseudo: payload.pseudo,
        email:payload.email
    };

    const accessToken = await createAccessToken(newPayload);
    const refreshToken = await createRefreshToken(jti, newPayload);

    await saveToken({
        id: payload.id,
        jti,
        refreshToken,
        sessionId: payload.sessionId,
        ip: payload.ip,
        userAgent: payload.userAgent,
        expiresAt: payload.expiresAt,
        db
    });
    return { accessToken, refreshToken };
};


const createRefreshToken = async (jti,payload) => {
    let jwtPayload = {
        id:payload.id,
        pseudo:payload.pseudo,
        email:payload.email
    };

    return jwt.sign(
        {
            ...jwtPayload
            ,jti},
        refreshTokenSecret,
        {expiresIn: jwtRefreshExpiration}
    );
};

// droit
// user → 0
// prestataire → 1
// admin → 2
const createAccessToken = async (payload, role = "0") => {
    let jwtPayload = {
        id: payload.id,
        pseudo: payload.pseudo,
        email: payload.email
    };
    return jwt.sign(
        {
            ...jwtPayload,
            role: String(role)
        },
        accessTokenSecret,
        { expiresIn: jwtExpiration }
    );
};




export default {
    accessTokenSecret: accessTokenSecret,
    refreshTokenSecret:refreshTokenSecret,
    jwtExpiration:jwtExpiration,
    jwtRefreshExpiration:jwtRefreshExpiration,

    deleteTokenByJti,
    existsToken,
    saveToken,
    hashToken,
    createAccessRefreshTokens,
    createAccessToken,
    createRefreshToken
};