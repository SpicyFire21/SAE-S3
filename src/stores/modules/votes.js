import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFilmsStore } from './films.js'

export const useVotesStore = defineStore('votes', () => {
    const filmsStore = useFilmsStore()

    // votes : { category: { userId: filmId } }
    const votes = ref({})

    // --- Ajouter ou mettre à jour un vote ---
    const addOrUpdateVote = ({ filmId, category, userId }) => {
        if (!votes.value[category]) votes.value[category] = {}

        // Empêche de voter plusieurs fois dans la même catégorie
        if (votes.value[category][userId]) return false

        votes.value[category][userId] = filmId
        return true
    }

    // --- Supprimer le vote d'un utilisateur pour une catégorie ---
    const removeVote = ({ category, userId }) => {
        if (votes.value[category]?.[userId]) {
            delete votes.value[category][userId]
        }
    }

    // --- Vérifie si l'utilisateur a déjà voté pour une catégorie ---
    const hasVotedCategory = (category, userId) => {
        return !!votes.value[category]?.[userId]
    }

    // --- Retourne le film sur lequel l'utilisateur a voté pour une catégorie ---
    const getVotedFilmIdForCategory = (category, userId) => {
        return votes.value[category]?.[userId] || null
    }

    // --- Calculer le classement pour une catégorie ---
    const getRanking = (category) => {
        const rankingMap = {}
        const catVotes = votes.value[category] || {}

        // Compter les votes par film
        for (const userId in catVotes) {
            const filmId = catVotes[userId]
            if (!rankingMap[filmId]) rankingMap[filmId] = 0
            rankingMap[filmId]++
        }

        // Transformer en tableau et ajouter le titre du film
        return Object.entries(rankingMap)
            .map(([filmId, score]) => {
                const film = filmsStore.films.find(f => f.id === filmId)
                if (!film) return null
                return { filmId, title: film.title, score }
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
    }

    return {
        votes,
        addOrUpdateVote,
        removeVote,
        hasVotedCategory,
        getVotedFilmIdForCategory,
        getRanking
    }
})
