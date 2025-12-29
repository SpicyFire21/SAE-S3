import genreService from "../services/genre.service.js";


export const getGenres = async (req,res) => {
    try {
        let data = await genreService.getGenres();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des genres");
    }
}

export const getGenresById = async (req,res) => {
    try {
        let data = await genreService.getGenresById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des genres par id");
    }
}







