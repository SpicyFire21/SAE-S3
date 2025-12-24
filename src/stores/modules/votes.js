import { ref } from "vue"
import { defineStore } from "pinia"
import { useUserStore } from "@/stores/index.js"

export const useVotesStore = defineStore('votes', () => {

    // --- STATE ---
    const filmsScore = ref({}) // { filmId: { categorie: score } }
    const votes = ref([]) // [{ filmId, userId, category }]

    const userStore = useUserStore();

    // --- INIT depuis localStorage ---
    const savedScore = localStorage.getItem("filmsScore")
    const savedVotes = localStorage.getItem("votes")

    if (savedScore) {
        filmsScore.value = JSON.parse(savedScore)
    }

    if (savedVotes) {
        votes.value = JSON.parse(savedVotes)
    }

    // --- ACTIONS ---
    const addVote = (vote) => {
        // Vérifier si l'utilisateur est connecté
        if (!userStore.currentUser) {
            throw new Error("Vous devez être connecté pour voter.")
        }

        const { filmId, category } = vote
        const userId = userStore.currentUser.id // récupérer l'ID depuis le store

        // Vérifier si l'utilisateur a déjà voté pour ce film dans cette catégorie
        const alreadyVoted = votes.value.find(
            v => v.filmId === filmId && v.userId === userId && v.category === category
        )

        if (alreadyVoted) {
            throw new Error("Tu as déjà voté pour ce film dans cette catégorie.")
        }

        // Ajouter le vote
        votes.value.push({ filmId, userId, category })

        // Initialiser score si nécessaire
        if (!filmsScore.value[filmId]) {
            filmsScore.value[filmId] = {}
        }

        if (!filmsScore.value[filmId][category]) {
            filmsScore.value[filmId][category] = 0
        }

        filmsScore.value[filmId][category]++

        // Sauvegarder dans localStorage
        localStorage.setItem("filmsScore", JSON.stringify(filmsScore.value))
        localStorage.setItem("votes", JSON.stringify(votes.value))
    }

    const resetVotes = () => {
        votes.value = []
        filmsScore.value = {}
        localStorage.removeItem("filmsScore")
        localStorage.removeItem("votes")
    }

    return {
        filmsScore,
        votes,
        addVote,
        resetVotes
    }
})
