import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import votesService from "@/services/votes.service.js"

export const useVotesStore = defineStore('votes', () => {
    const votes = ref([]) // {userId, filmId, category, score}

    const categories = ref(["Meilleur Film", "Meilleur Réalisateur", "Meilleur Scénario"])

    const filmsScore = computed(() => {
        const scores = {}
        votes.value.forEach(v => {
            if (!scores[v.filmId]) scores[v.filmId] = {}
            if (!scores[v.filmId][v.category]) scores[v.filmId][v.category] = 0
            scores[v.filmId][v.category] += v.score
        })
        return scores
    })

    const addVote = async (vote) => {
        try {
            await votesService.addVote(vote)
            votes.value.push(vote)
        } catch (e) {
            console.error("Erreur vote:", e)
        }
    }

    const getVotes = async () => {
        try {
            const response = await votesService.getVotes()
            votes.value = response.data
        } catch (e) {
            console.error(e)
        }
    }

    return { votes, categories, filmsScore, addVote, getVotes }
})
