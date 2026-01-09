import filmService from "../services/film.service.js";
import voteService from "../services/vote.service.js";


export const getFilms = async (req,res) => {
    try {
        let data = await filmService.getFilms();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des films");
    }
}


export const getFilmsGenres = async (req,res) => {
    try {
        let data = await filmService.getFilmsGenres();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des genres des films");
    }
}
export const getFilmsCasts = async (req,res) => {
    try {
        let data = await filmService.getFilmsCasts();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des casts des films");
    }
}
export const getFilmsById = async (req,res) => {
    try {
        let data = await filmService.getFilmsById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du film par id");
    }
}
export const getFilmRequests = async (req,res) => {
    try {
        let data = await filmService.getFilmRequests();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des requêtes de films");
    }
}
export const getFilmRequestsGenres = async (req,res) => {
    try {
        let data = await filmService.getFilmRequestsGenres();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des genres des requêtes de films");
    }
}
export const addFilm = async (req,res) => {
    try {
        let data = await voteService.addFilm(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout du film");
    }
}
export const addFilmRequest = async (req,res) => {
    try {
        let data = await voteService.addFilmRequest(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la requête de film");
    }
}
export const deleteFilm = async (req,res) => {
    try {
        let data = await voteService.deleteFilm(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du film");
    }
}
export const deleteFilmRequest = async (req,res) => {
    try {
        let data = await voteService.deleteFilmRequest(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de la requête de film");
    }
}








