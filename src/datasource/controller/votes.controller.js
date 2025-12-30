import { votes_score } from '@/datasource/data.js'

// Copie locale des scores pour manipuler les votes
let scores = { ...votes_score }

export default {
    getVotes() {
        return scores
    },

    addOrUpdateVote(filmId, category) {
        if (!scores[filmId]) scores[filmId] = {}
        if (!scores[filmId][category]) scores[filmId][category] = 0
        scores[filmId][category] += 1
        return scores[filmId]
    },

    removeVote(filmId, category) {
        if (scores[filmId] && scores[filmId][category] && scores[filmId][category] > 0) {
            scores[filmId][category] -= 1
        }
        return scores[filmId]
    }
}
