import jwtConfig from "./jwt.config.js";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const cookieConfig = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: jwtConfig.jwtRefreshExpiration * 1000,
    path: '/'
};


export const clearCookieConfig = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/'
};