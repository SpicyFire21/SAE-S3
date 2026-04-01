import jwt from 'jsonwebtoken'
import config from "../config/jwt.config.js"
const {TokenExpiredError} = jwt;

const catchError = (err,res) => {
    if(err instanceof TokenExpiredError){

        return res.status(401).send({message:" Non autorisé! Le jeton d'accès a expiré!"})
    }

    return res.status(401).send({message:" Non autorisé!"})

}

export const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]; // l'access token est posé sur "x-access-token"
    if (!token) {
        token = req.headers["authorization"];
        if (!token) {
            return res.status(403).send({message: "Aucun jeton fourni!"});
        }
        token = token.split(" ")[1];
    }
    jwt.verify(token, config.accessTokenSecret, (err, decoded) => {
        if (err) {
            return catchError(err,res);
        }

        if (!decoded.droit) {

            return res.status(403).json({ message: "Unauthorized" });
        }

        req.userId = decoded.id;
        req.userRole = decoded.droit
        next();
    });
};

export const verifyRole = (roles) => (req,res,next) => {

    console.log(roles)
    console.log(req.userRole)

    const tokenRole = Number(req.userRole)

    if (roles.includes(tokenRole)) {
        next();
    } else {
        res.status(403).send({ message: "Accès réservé à certains rôles!" });
    }
}