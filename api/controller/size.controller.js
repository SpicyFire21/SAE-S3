import sizeService from "../services/size.service.js";
import colorService from "../services/color.service.js";


export const getSizes = async (req,res) => {
    try {
        let data = await sizeService.getSizes();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des tailles");
    }
}

export const addSize = async (req,res) => {
    try {
        let data = await sizeService.addSize(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la taille");
    }
}






