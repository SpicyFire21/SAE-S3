import userService from "../services/user.service.js";
import {clearCookieConfig, cookieConfig} from "../config/cookie.config.js";
// besoin d'implémenter une route de déconnexion

export const getUsers = async (req,res) => {
    try {
        let data = await userService.getUsers();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des utilisateurs");
    }
}
export const getUsersById = async (req,res) => {
    try {
        let data = await userService.getUsersById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de l\'utilisateur");
    }
}

export const addUser = async (req,res) => {
    const { droit } = req.body;
    try {
        let data;
        if (droit === 0 || droit === 1) {
            data = await userService.addUser(req.body);
        } else {
            return res.status(400).send("Veuillez rentrer un droit valide (0 ou 1)");
        }
        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création d'un nouveau compte");
    }
}

export const login = async (req,res) =>{
    try {
        let data = await userService.login(req.body);
        return res
            .cookie("refreshToken", data.data.refreshToken, cookieConfig)
            .status(data.status)
            .json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la connexion");
    }
}

export const logout = async (req,res) => {
    try{
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(403).send("Le jeton d'actualisation est requis!");
        }

        let data = await userService.logout(refreshToken);

        return res
            .clearCookie("refreshToken",clearCookieConfig)
            .status(data.status)
            .json({ data: data });
    } catch(error){
        console.error(error);
        return res.status(500).send("Erreur lors de la déconnexion de l'utilisateur");
    }
}

export const getNotesByUserId = async (req,res) => {
    try {
        let data = await userService.getNotesByUserId(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des note de l\'utilisateur");
    }
}


