import votesController from "@/datasource/controller/votes.controller.js"

// ---- LOCAL SOURCE ----
async function getVoteFromLocalSource() {
    return votesController.getVote();
}

async function getVotesByUserIdFromLocalSource(id) {
    return votesController.getVotesByUserId(id);
}

async function addVoteFromLocalSource(data) {
    return votesController.AddVote(data);
}

async function removeVoteFromLocalSource(data) {
    return votesController.removeVote(data);
}

async function updateScoreFromLocalSource(data,modif) {
    return votesController.updateScore(data,modif);
}

async function getCategoryFromLocalSource() {
    return votesController.getCategory();
}

async function getScoreFromLocalSource() {
    return votesController.getScore();
}

// ---- SERVICE METHODS ----

async function getVotes() {
    let response = null;
    try {
        response = await getVoteFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les votes" };
    }
    return response;
}

async function getVotesByUserId(id) {
    let response = null;
    try {
        response = await getVotesByUserIdFromLocalSource(id);
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les votes utilisateur" };
    }
    return response;
}

async function AddVote(data) {
    let response = null;
    try {
        response = await addVoteFromLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible d'ajouter ou modifier le vote" };
    }
    return response;
}

async function removeVote(data) {
    let response = null;
    try {
        response = await removeVoteFromLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer le vote" };
    }
    return response;
}

async function updateScore(data,modif) {
    let response = null;
    try {
        response = await updateScoreFromLocalSource(data,modif);
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de modifier le score" };
    }
    return response;
}

async function getCategory() {
    let response = null;
    try {
        response = await getCategoryFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les catégories" };
    }
    return response;
}

async function getScore() {
    let response = null;
    try {
        response = await getScoreFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les scores" };
    }
    return response;
}

export default {
    getVotes,
    getVotesByUserId,
    AddVote,
    removeVote,
    updateScore,
    getCategory,
    getScore
}
