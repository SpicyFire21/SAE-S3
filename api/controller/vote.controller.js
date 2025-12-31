import voteService from "../services/vote.service.js";


export const getVotes = async (req,res) => {
    try {
        let data = await voteService.getVotes();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des votes");
    }
}

export const addVote = async (req,res) => {
    try {
        let data = await voteService.addVote(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout du vote");
    }
}

export const deleteVote = async (req,res) => {
    try {
        let data = await voteService.deleteVote(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du vote");
    }
}
