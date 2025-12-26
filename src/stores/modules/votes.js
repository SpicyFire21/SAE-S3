import { ref } from "vue"
import { defineStore } from "pinia"
import votesService from "@/services/votes.service.js"

export const useVotesStore = defineStore('votes', () => {

    // --- STATE ---
    const filmsScore = ref({}) // { filmId: { category: score } }
    const votes = ref({}) // { userId: { category: filmId } }

    // --- INIT depuis localStorage ---
    const savedScore = localStorage.getItem("filmsScore")
    const savedVotes = localStorage.getItem("votes")

    if (savedScore) filmsScore.value = JSON.parse(savedScore)
    if (savedVotes) votes.value = JSON.parse(savedVotes)

    // --- ACTIONS ---
    const addOrUpdateVote = async ({ filmId, userId, category }) => {
        if (!userId || !filmId || !category) return

        try {
            // init safe score
            if (!filmsScore.value[filmId]) filmsScore.value[filmId] = {}
            if (!filmsScore.value[filmId][category]) filmsScore.value[filmId][category] = 0

            // call service
            const res = await votesService.addOrUpdateVote({ filmId, userId, category })

            if (res.error) throw new Error(res.data)

            // mettre à jour le score local
            const userVotes = votes.value[userId] || {}

            // retirer ancien vote du score si existant
            if (userVotes[category]) {
                const oldFilm = userVotes[category]
                if (filmsScore.value[oldFilm]?.[category]) {
                    filmsScore.value[oldFilm][category]--
                }
            }

            // ajouter 1 point au nouveau film
            filmsScore.value[filmId][category]++

            // enregistrer le vote
            votes.value[userId] = { ...userVotes, [category]: filmId }

            // save
            localStorage.setItem("filmsScore", JSON.stringify(filmsScore.value))
            localStorage.setItem("votes", JSON.stringify(votes.value))

            return res.data

        } catch (e) {
            console.error("Store votes error:", e)
            throw new Error("Erreur réseau, impossible d’ajouter un vote.")
        }
    }

    const removeVote = async ({ userId, category }) => {
        if (!votes.value[userId]?.[category]) {
            throw new Error("Aucun vote trouvé dans cette catégorie.")
        }

        try {
            const filmId = votes.value[userId][category]

            // retirer 1 point du score
            if (filmsScore.value[filmId]?.[category]) {
                filmsScore.value[filmId][category]--
            }

            // supprimer le vote dans l'objet
            const updatedUserVotes = { ...votes.value[userId] }
            delete updatedUserVotes[category]
            votes.value[userId] = updatedUserVotes

            // call service
            const res = await votesService.removeVote({ userId, category })
            if (res.error) throw new Error(res.data)

            // save
            localStorage.setItem("filmsScore", JSON.stringify(filmsScore.value))
            localStorage.setItem("votes", JSON.stringify(votes.value))

            return true

        } catch (e) {
            console.error("Store removeVote error:", e)
            throw new Error("Erreur réseau, impossible de supprimer le vote.")
        }
    }

    const resetVotes = () => {
        votes.value = {}
        filmsScore.value = {}
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
