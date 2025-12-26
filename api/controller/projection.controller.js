import projectionService from "../services/projection.service.js";


export const getProjections = async (req,res) => {
    try {
        let data = await projectionService.getProjections();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des projections");
    }
}









