import standService from "../services/stand.service.js";


export const getStands = async (req,res) => {
    try {
        let data = await standService.getStands();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des stands");
    }
}

export const getStandsById = async (req,res) => {
    try {
        let data = await standService.getStandsById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des stands par id");
    }
}

export const getStandsTypes = async (req,res) => {
    try {
        let data = await standService.getStandsTypes();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des types de stands");
    }
}

export const getStandTypeById = async (req,res) => {
    try {
        let data = await standService.getStandTypeById(req.params.idtype);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des types de stands par id");
    }
}


export const getStandsReservationsRequests = async (req,res) => {
    try {
        let data = await standService.getStandsReservationsRequests();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des requêtes de stands");
    }
}

export const addStandRequest = async (req,res) => {
    try {
        let data = await standService.addStandRequest(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout d'un requête de stands");
    }
}







