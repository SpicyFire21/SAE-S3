import { reactive } from "vue"
import { defineStore } from "pinia"

export const useVotesStore = defineStore('votes', () => {

    // --- STATE ---
    const filmsScore = reactive({}) // { filmId: { category: score } }
    const votes = reactive({}) // { userId: { category: filmId } }

    // --- INIT depuis localStorage ---
    const savedScore = localStorage.getItem("filmsScore")
    const savedVotes = localStorage.getItem("votes")

    if (savedScore) Object.assign(filmsScore, JSON.parse(savedScore))
    if (savedVotes) Object.assign(votes, JSON.parse(savedVotes))

    // --- ACTIONS ---
    const addOrUpdateVote = ({ filmId, userId, category }) => {
        if (!userId || !category || !filmId) return

        if (!votes[userId]) votes[userId] = {}

        // Si déjà voté dans cette catégorie → retirer ancien film du score
        const oldFilm = votes[userId][category]
        if (oldFilm && filmsScore[oldFilm]?.[category]) {
            filmsScore[oldFilm][category]--
        }

        // Ajouter 1 point au nouveau film
        if (!filmsScore[filmId]) filmsScore[filmId] = {}
        if (!filmsScore[filmId][category]) filmsScore[filmId][category] = 0
        filmsScore[filmId][category]++

        // Enregistrer le vote
        votes[userId][category] = filmId

        // Sauvegarder
        localStorage.setItem("filmsScore", JSON.stringify(filmsScore))
        localStorage.setItem("votes", JSON.stringify(votes))
    }

    const removeVote = ({ userId, category }) => {
        if (!votes[userId] || !votes[userId][category]) {
            throw new Error("Aucun vote trouvé dans cette catégorie.")
        }

        const filmId = votes[userId][category]

        if (filmsScore[filmId]?.[category]) {
            filmsScore[filmId][category]--
        }

        delete votes[userId][category]
        if (Object.keys(votes[userId]).length === 0) delete votes[userId]

        localStorage.setItem("filmsScore", JSON.stringify(filmsScore))
        localStorage.setItem("votes", JSON.stringify(votes))
    }

    const resetVotes = () => {
        for (const k in votes) delete votes[k]
        for (const k in filmsScore) delete filmsScore[k]
        localStorage.removeItem("filmsScore")
        localStorage.removeItem("votes")
    }

    return {
        filmsScore,
        votes,
        addOrUpdateVote,
        removeVote,
        resetVotes
    }
})
