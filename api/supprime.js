import { votes, votes_category, votes_score } from "@/datasource/data.js";
import { v4 as uuidv4 } from "uuid";

/**
 * POST → Ajoute un vote dans la table `votes`
 * 1 vote max par catégorie et par utilisateur
 */
async function AddVote(data) {
    if (!data.userId) {
        return { error: 1, status: 400, data: "userId manquant" };
    }
    if (!data.filmId) {
        return { error: 1, status: 400, data: "filmId manquant" };
    }
    if (!data.category_id) {
        return { error: 1, status: 400, data: "category_id manquant" };
    }

    // Vérifie si l'utilisateur a déjà voté pour cette catégorie
    const alreadyVoted = votes.find(v => v.userId === data.userId && v.category_id === data.category_id);
    if (alreadyVoted) {
        return { error: 1, status: 409, data: "Vous avez déjà voté dans cette catégorie" };
    }

    const newVote = {
        id: uuidv4(),
        userId: data.userId,
        filmId: data.filmId,
        category_id: data.category_id
    };

    votes.push(newVote);
    return { error: 0, status: 201, data: newVote };
}

/**
 * GET → Récupère tous les votes (`votes`)
 */
async function getVote() {
    return { error: 0, status: 200, data: votes };
}

/**
 * GET → Récupère les votes (`votes`) d’un utilisateur spécifique
 */
async function getVotesById(userId) {
    if (!userId) {
        return { error: 1, status: 400, data: "userId manquant" };
    }

    const userVotes = votes.filter(v => v.userId === userId);
    return { error: 0, status: 200, data: userVotes };
}

/**
 * DELETE → Supprime un vote dans `votes`
 */
async function removeVote(data) {
    if (!data.userId || !data.category_id) {
        return { error: 1, status: 400, data: "Paramètres manquants (userId ou category_id)" };
    }

    const index = votes.findIndex(v => v.userId === data.userId && v.category_id === data.category_id);

    if (index === -1) {
        return { error: 1, status: 404, data: "Vote inexistant" };
    }

    const deletedVote = votes.splice(index, 1)[0];
    return { error: 0, status: 200, data: deletedVote };
}

/**
 * PUT → Incrémente ou décrémente le score dans `votes_score` selon la valeur entré en paramettre
 * (si n'existe pas encore → création automatique)
 */
async function updateScore(data, modif) {
    if (!data.film_id || !data.category_id ) {
        return { error: 1, status: 400, data: "film_id ou category_id manquant" };
    }

    let score = votes_score.find(s => s.film_id === data.film_id && s.category_id === data.category_id);

    // si la ligne n'existe pas → création
    if (!score) {
        score = {
            film_id: data.film_id,
            category_id: data.category_id,
            total_score: 0
        };
        votes_score.push(score);
    }

    score.total_score = Math.max(0, score.total_score + modif);

    return { error: 0, status: 202, data: score };
}


/**
 * GET → Retourne toutes les catégories de vote (`votes_category`)
 */
async function getCategory() {
    return { error: 0, status: 200, data: votes_category };
}

/**
 * GET → Retourne les scores (`votes_score`)
 */
async function getScore() {
    return { error: 0, status: 200, data: votes_score };
}

export default {
    AddVote,        //
    getVote,        //
    getVotesById,   //
    removeVote,     //
    updateScore,    //
    getCategory,    //
    getScore        //
};