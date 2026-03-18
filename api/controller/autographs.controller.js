import autographsService from "../services/autographs.service.js";
import filmService from "../services/film.service.js";


export const getAutographs = async (req,res) => {
    try {
        let data = await autographsService.getAutographs();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des autographes");
    }
}

export const getAutographsById = async (req,res) => {
    try {
        let data = await autographsService.getAutographsById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des autographes par id");
    }
}

export const getAutographsByStandId = async (req,res) => {
    try {
        let data = await autographsService.getAutographsByStandId(req.params.idstand);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des autographes par id de stand");
    }
}

export const addAutograph = async (req,res) => {
    try {
        let data = await autographsService.addAutograph(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erreur lors de la création de l\'autograph');
    }
}

export const editAutograph = async (req,res) => {
    try {
        let data = await autographsService.editAutograph(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erreur lors de la modification de l\'autograph');
    }
}

export const deleteAutograph = async (req,res) => {
    try {
        let data = await autographsService.deleteAutograph(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erreur lors de la suppression de l\'autograph');
    }
}

export const getAutographsReservations = async (req,res) => {
    try {
        let data = await autographsService.getAutographsReservations();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des réservations des autographs");
    }
}


export const addAutographsReservations = async (req,res) => {
    try {
        let data = await autographsService.addAutographsReservations(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la réservation de l'autograph");
    }
}






