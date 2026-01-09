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
        let data = await voteService.deleteVote(req.params.iduser,req.params.idcategory);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du vote");
    }
}


export const getVotesById = async (req,res) => {
    try {
        let data = await voteService.getVotesById(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du vote par id");
    }
}

export const editVote = async  (req,res) =>{
    try {
        let data = await voteService.editVote(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification du vote");
    }
}

export const addCategory = async (req,res) => {
    try {
        let data = await voteService.addCategory(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la catégorie");
    }
}

export const deleteCategory = async (req,res) => {
    try {
        let data = await voteService.deleteCategory(req.params.id);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de la catégorie par id");
    }
}

export const deleteAllScores = async (req,res) => {
    try {
        let data = await voteService.deleteAllScores();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppressions des scores");
    }
}

export const deleteAllVotes = async (req,res) => {
    try {
        let data = await voteService.deleteAllVotes();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression des votes");
    }
}

export const deleteAllScoresByFilm = async (req,res) => {
    try {
        let data = await voteService.deleteAllScoresByFilm(req.params.idfilm);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression des scores du film");
    }
}