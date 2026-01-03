import scoreService from "../services/score.service.js";


export const getScores = async (req,res) => {
    try {
        let data = await scoreService.getScores();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des scores");
    }
}
