// src/stores/modules/votes.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import votesService from '@/services/votes.service.js'
import { useFilmsStore } from '@/stores/modules/films.js'
import {votes_score} from "@/datasource/data.js";

export const useVotesStore = defineStore('votes', () => {
    const filmsStore = useFilmsStore()

    // ----- STATE -----
    const votes = ref([])          // tous les votes
    const votesByUser = ref([])    // votes d'un utilisateur
    const categories = ref([])     // catégories de vote
    const scores = ref([])         // score total par film/catégorie

    // ----- MUTATIONS -----
    const setVotes = (data) => { votes.value = data || [] }
    const setVotesByUser = (data) => { votesByUser.value = data || [] }
    const setCategories = (data) => { categories.value = data || [] }
    const setScores = (data) => { scores.value = data || [] }

    const addVoteLocally = (vote) => { votes.value.push(vote) }
    const removeVoteLocally = (vote) => {
        votes.value = votes.value.filter(v =>
            !(v.userId === vote.userId && v.category_id === vote.category_id)
        )
    }
    const updateScoreLocally = (score) => {
        const index = scores.value.findIndex(s => s.film_id === score.film_id && s.category_id === score.category_id)
        if (index !== -1) scores.value.splice(index, 1, score)
        else scores.value.push(score)
    }

    // ----- ACTIONS -----
    const getVotes = async () => {
        try {
            const res = await votesService.getVotes()
            if (res?.error === 0) setVotes(res.data)
            else setVotes([])
        } catch (e) { console.error(e); setVotes([]) }
    }

    const getVotesByUserId = async (userId) => {
        try {
            const res = await votesService.getVotesByUserId(userId)
            if (res?.error === 0) setVotesByUser(res.data)
            else setVotesByUser([])
        } catch (e) { console.error(e); setVotesByUser([]) }
    }

    const AddVote = async (data) => {
        try {
            // Vérifie si l'utilisateur a déjà voté pour cette catégorie
            const existingVote = votes.value.find(
                v => v.userId === data.userId && v.category_id === data.category_id
            );

            if (existingVote) {
                // Bloque le vote si un vote existe déjà
                return {
                    error: 1,
                    status: 400,
                    data: "Vous avez déjà voté pour cette catégorie."
                };
            }

            // Sinon, ajoute normalement
            const res = await votesService.AddVote(data);
            if (res?.error === 0) addVoteLocally(res.data);

            // MAJ score
            //await updateScore({ filmId: data.filmId, category_id: data.category_id }, 1)
            //await getScores()

            return res;
        } catch (e) {
            console.error(e);
        }
    }

    const removeVote = async (data) => {
        try {
            const res = await votesService.removeVote(data)
            if (res?.error === 0) removeVoteLocally(data)

            //await updateScore({ filmId: data.filmId, category_id: data.category_id }, -1)
            //await getScores()

            return res;
        } catch (e) { console.error(e) }
    }

    const updateScore = async (data, modif) => {
        try {
            const payload = {
                film_id: data.filmId,
                category_id: data.category_id
            }

            console.log("➡ updateScore envoyé au controller :", payload, "modif :", modif)

            const res = await votesService.updateScore(payload, modif)

            console.log("⬅ Réponse controller score :", res)

            if (res?.error === 0) {
                updateScoreLocally(res.data)
            }

            return res
        } catch (e) {
            console.error(e)
            return { error: 1, data: "Impossible de modifier le score" }
        }
    }

    const getCategories = async () => {
        try {
            const res = await votesService.getCategory()
            if (res?.error === 0) setCategories(res.data)
            else setCategories([])
        } catch (e) { console.error(e); setCategories([]) }
    }

    const getScores = async () => {
        try {
            const res = await votesService.getScore()
            if (res?.error === 0) setScores(res.data)
            else setScores([])
        } catch (e) { console.error(e); setScores([]) }
    }


    // ----- ADMIN ACTIONS -----
    // -- ADMIN STATE --
    const votingOpen = ref(true)

    // Ouvre ou ferme les votes
    const toggleVoting = async (status) => {
        votingOpen.value = status
        return { error: 0, data: `Votes ${status ? "ouverts" : "fermés"}` }
    }

    // Reset : supprime tous les votes + scores
    const resetAllVotesAndScores = async () => {
        const resVotes = await votesService.deleteAllVotes()
        const resScores = await votesService.deleteAllScores()

        if (resVotes.error === 0 && resScores.error === 0) {
            votes.value = []
            scores.value = []
            return { error: 0, data: "Votes et scores réinitialisés" }
        }

        return { error: 1, data: "Erreur lors du reset" }
    }

    const addCategory = async (data) => {
        try {
            const res = await votesService.addCategory(data)
            if (res?.error === 0) {
                categories.value.push(res.data) // MAJ locale du store
            }
            return res
        } catch (e) {
            console.error(e)
            return { error: 1, data: "Impossible d'ajouter la catégorie" }
        }
    }

    const deleteCategory = async (id) => {
        try {
            const res = await votesService.deleteCategory(id)
            if (res?.error === 0) {
                categories.value = categories.value.filter(c => c.id !== id) // MAJ locale du store
            }
            return res
        } catch (e) {
            console.error(e)
            return { error: 1, data: "Impossible de supprimer la catégorie" }
        }
    }

    // ----- HELPERS pour modal / composants -----

    // vérifie si l'utilisateur a voté pour cette catégorie (any film)
    const hasVotedCategory = (categoryName, userId) => {
        const cat = categories.value.find(c => c.category_name === categoryName)
        if (!cat) return false
        return votes.value.some(v => v.userId === userId && v.category_id === cat.id)
    }

    // récupère le film_id sur lequel l'utilisateur a voté pour cette catégorie
    const getVotedFilmIdForCategory = (categoryName, userId) => {
        const cat = categories.value.find(c => c.category_name === categoryName)
        if (!cat) return null
        const vote = votes.value.find(v => v.userId === userId && v.category_id === cat.id)
        return vote?.filmId || null
    }

    const getVotesForFilm = (filmId) => {
        const result = {};
        categories.value.forEach(category => {
            // récupère le score pour ce film dans cette catégorie
            const score = scores.value.find(s => s.film_id === filmId && s.category_id === category.id);
            result[category.name] = score ? score.total_score : 0;
        });
        return result;
    };

    // retourne un classement trié des films pour une catégorie donnée
    const getRanking = (categoryName) => {
        const cat = categories.value.find(c => c.category_name === categoryName)
        if (!cat) return []
        return scores.value
            .filter(s => s.category_id === cat.id)
            .map(s => {
                const film = filmsStore.films.find(f => f.id === s.film_id)
                return { filmId: s.film_id, title: film?.title || "Film inconnu", score: s.total_score }
            })
            .sort((a, b) => b.score - a.score)
    }

    const hasUserVoted = (filmId, categoryId, userId) => {
        return votesByUser.value.some(v =>
            v.filmId === filmId && v.category_id === categoryId && v.userId === userId
        )
    }

    const deleteAllScoresByFilm = async (filmId) => {
        try {
            const res = await votesService.deleteAllScoresByFilm(filmId)
            if (res?.error === 0) {
                scores.value = scores.value.filter(c => c.filmId !== filmId) // MAJ locale du store
            }
            return res
        } catch (e) {
            console.error(e)
            return { error: 1, data: "Impossible de supprimer les scores du film" }
        }
    }

    const removeVotesOfFilm = async (filmId) => {
        try {
            const votesToRemove = votes.value.filter(v => v.filmId === filmId)

            for (const v of votesToRemove) {
                await votesStore.removeVote({
                    userId: v.userId,
                    category_id: v.category_id
                })
            }

            return { error: 0, data: "Votes du film supprimés ✔" }
        } catch (e) {
            console.error(e)
            return { error: 1, data: "Erreur suppression votes du film" }
        }
    }

    // ----- RETURN -----
    return {
        votes,
        votesByUser,
        categories,
        scores,

        getVotesForFilm,
        getVoteByCategory: (categoryId, userId) => votes.value.find(v => v.category_id === categoryId && v.userId === userId),
        getScoreByFilmAndCategory: (filmId, categoryId) => scores.value.find(s => s.film_id === filmId && s.category_id === categoryId)?.total_score || 0,
        getRanking,
        hasVotedCategory,
        getVotedFilmIdForCategory,

        setVotes,
        setVotesByUser,
        setCategories,
        setScores,
        addVoteLocally,
        removeVoteLocally,
        updateScoreLocally,

        getVotes,
        getVotesByUserId,
        AddVote,
        removeVote, removeVotesOfFilm,
        updateScore,
        getCategories,
        getScores,
        hasUserVoted,
        votingOpen,
        toggleVoting,
        resetAllVotesAndScores,
        addCategory,
        deleteCategory,
        deleteAllScoresByFilm
    }
})
