import { v4 as uuidv4 } from "uuid"

async function getVotes() {
    const saved = localStorage.getItem("votes")
    return { error: 0, status: 200, data: saved ? JSON.parse(saved) : {} }
}

async function addOrUpdateVote({ userId, filmId, category }) {
    const saved = localStorage.getItem("votes")
    const votes = saved ? JSON.parse(saved) : {}

    // Initialiser user si absent
    if (!votes[userId]) votes[userId] = {}

    const oldFilm = votes[userId][category]

    // Retirer 1 point à l'ancien film si changement
    if (oldFilm && oldFilm !== filmId) {
        const scoreData = localStorage.getItem("filmsScore")
        const filmsScore = scoreData ? JSON.parse(scoreData) : {}
        if (filmsScore[oldFilm]?.[category]) {
            filmsScore[oldFilm][category]--
            localStorage.setItem("filmsScore", JSON.stringify(filmsScore))
        }
    }

    // Ajouter 1 point au nouveau film
    const scoreData = localStorage.getItem("filmsScore")
    const filmsScore = scoreData ? JSON.parse(scoreData) : {}
    if (!filmsScore[filmId]) filmsScore[filmId] = {}
    if (!filmsScore[filmId][category]) filmsScore[filmId][category] = 0
    filmsScore[filmId][category]++
    localStorage.setItem("filmsScore", JSON.stringify(filmsScore))

    // Enregistrer le vote
    votes[userId][category] = filmId
    localStorage.setItem("votes", JSON.stringify(votes))

    return { error: 0, status: 201, data: { userId, filmId, category } }
}

async function removeVote({ userId, category }) {
    const saved = localStorage.getItem("votes")
    const votes = saved ? JSON.parse(saved) : {}

    if (!votes[userId]?.[category]) {
        return { error: 1, status: 404, data: "Aucun vote trouvé." }
    }

    const filmId = votes[userId][category]

    // Retirer 1 point au film
    const scoreData = localStorage.getItem("filmsScore")
    const filmsScore = scoreData ? JSON.parse(scoreData) : {}
    if (filmsScore[filmId]?.[category]) {
        filmsScore[filmId][category]--
        if (filmsScore[filmId][category] <= 0) delete filmsScore[filmId][category]
        localStorage.setItem("filmsScore", JSON.stringify(filmsScore))
    }

    // Supprimer le vote
    delete votes[userId][category]
    localStorage.setItem("votes", JSON.stringify(votes))

    return { error: 0, status: 200, data: "Vote supprimé." }
}

async function resetVotes() {
    localStorage.removeItem("votes")
    localStorage.removeItem("filmsScore")
    return { error: 0, status: 200, data: "Votes réinitialisés." }
}

export default {
    getVotes,
    addOrUpdateVote,
    removeVote,
    resetVotes
}
