import autographsService from "../services/autographs.service.js";


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








