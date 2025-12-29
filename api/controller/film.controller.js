import filmService from "../services/film.service.js";


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










