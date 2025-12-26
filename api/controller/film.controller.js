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

export const getFilmDirector = async (req,res) => {
    try {
        let data = await filmService.getFilmDirector(req.params.iddirector);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du directeur du film");
    }
}










