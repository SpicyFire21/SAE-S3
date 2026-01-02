import commentsService from "../services/comments.service.js";


export const getComments = async (req,res) => {
    try {
        let data = await commentsService.getComments();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des commentaires");
    }
}

export const addComments = async (req,res) => {
    try {
        let data = await commentsService.addComments(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l\'ajout du commentaire");
    }
}









