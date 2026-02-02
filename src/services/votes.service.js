import votesController from "@/datasource/controller/votes.controller.js"
import {deleteRequest, getRequest, postRequest, putRequest} from "@/services/axios.service.js";

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

async function addCategoryFromLocalSource(data) {
    return votesController.addCategory(data);
}

async function deleteCategoryFromLocalSource(id) {
    return votesController.deleteCategory(id);
}

async function deleteAllScoresFromLocalSource() {
    return votesController.deleteAllScores();
}

async function deleteAllVotesFromLocalSource() {
    return votesController.deleteAllVotes();
}

async function deleteAllScoresByFilmFromLocalSource(id) {
    return votesController.deleteAllScoresByFilm(id);
}


async function getVoteFromAPI() {
    return getRequest("/votes","GET-VOTES");
}

async function getVotesByUserIdFromAPI(id) {
    return getRequest(`/votes/${id}`,"GET-VOTES-BY-ID");
}

async function addVoteFromAPI(data) {
    return postRequest("/votes",data,"ADD-VOTE");
}

async function removeVoteFromAPI(data) {
    return deleteRequest(`/votes/${data.userId}/${data.category_id}`,"REMOVE-VOTE")
}

async function updateScoreFromAPI(data,modif) {
    const payload = {
        ...data,
        modif
    }
    console.warn("verifier si cette route fonctionne !")
    return putRequest("/votes",payload,"EDIT-SCORES");
}

async function getCategoryFromAPI() {
    return getRequest("/categories","GET-CATEGORIES");
}

async function getScoreFromAPI() {
    return getRequest("/scores","GET-SCORES");
}

async function addCategoryFromAPI(data) {
    return postRequest("/votes/categories",data,"ADD-CATEGORY");
}

async function deleteCategoryFromAPI(id) {
    return deleteRequest(`/votes/categories/${id}`,'DELETE-CATEGORY-BY-ID')
}

async function deleteAllScoresFromAPI() {
    return deleteRequest(`/votes/scores`,'DELETE-ALL-SCORES')
}

async function deleteAllVotesFromAPI() {
    return deleteRequest(`/votes`,'DELETE-ALL-VOTES')
}

async function deleteAllScoresByFilmFromAPI(id) {
    return deleteRequest(`/votes/scores/${id}`,'DELETE-ALL-SCORES-BY-FILM-ID')
}

// ---- SERVICE METHODS ----

async function getVotes() {
    let response = null;
    try {
        // response = await getVoteFromLocalSource();
        response = await getVoteFromAPI();

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les votes" };
    }
    return response;
}

async function getVotesByUserId(id) {
    let response = null;
    try {
        // response = await getVotesByUserIdFromLocalSource(id);
        response = await getVoteFromAPI();

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les votes utilisateur" };
    }
    return response;
}

async function AddVote(data) {
    let response = null;
    try {
        // response = await addVoteFromLocalSource(data);
        response = await addVoteFromAPI(data);

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible d'ajouter ou modifier le vote" };
    }
    return response;
}

async function removeVote(data) {
    let response = null;
    try {
        // response = await removeVoteFromLocalSource(data);
        response = await removeVoteFromAPI(data);

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer le vote" };
    }
    return response;
}

async function updateScore(data,modif) {
    let response = null;
    try {
        // response = await updateScoreFromLocalSource(data,modif);
        response = await updateScoreFromAPI(data,modif);

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de modifier le score" };
    }
    return response;
}

async function getCategory() {
    let response = null;
    try {
        // response = await getCategoryFromLocalSource();
        response = await getCategoryFromAPI();

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les catégories" };
    }
    return response;
}

async function getScore() {
    let response = null;
    try {
        // response = await getScoreFromLocalSource();
        response = await getScoreFromAPI();

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de récupérer les scores" };
    }
    return response;
}

async function addCategory(data) {
    let response = null;
    try {
        // response = await addCategoryFromLocalSource(data);
        response = await addCategoryFromAPI(data);

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible d'ajouter la catégorie" };
    }
    return response;
}

async function deleteCategory(id) {
    let response = null;
    try {
        // response = await deleteCategoryFromLocalSource(id);
        response = await deleteCategoryFromAPI(id);

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer la catégorie" };
    }
    return response;
}

async function deleteAllScores() {
    let response = null;
    try {
        // response = await deleteAllScoresFromLocalSource();
        response = await deleteAllScoresFromAPI();

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer les scores" };
    }
    return response;
}

async function deleteAllVotes() {
    let response = null;
    try {
        // response = await deleteAllVotesFromLocalSource();
        response = await deleteAllVotesFromAPI();

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer les votes" };
    }
    return response;
}

async function deleteAllScoresByFilm(id) {
    let response = null;
    try {
        // response = await deleteAllScoresByFilmFromLocalSource(id);
        response = await deleteAllScoresByFilmFromAPI(id);

    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer les scores" };
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
    getScore,

    addCategory,
    deleteCategory,
    deleteAllScores,
    deleteAllVotes,
    deleteAllScoresByFilm
}
