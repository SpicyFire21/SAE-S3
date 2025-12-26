import colorService from "../services/color.service.js";


export const getColors = async (req,res) => {
    try {
        let data = await colorService.getColors();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des couleurs");
    }
}

export const addColor = async (req,res) => {
    try {
        let data = await colorService.addColor(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la couleur");
    }
}







