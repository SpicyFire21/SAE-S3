import votesController from '@/datasource/controller/votes.controller.js'

export default {
    async getVotes() {
        return new Promise(resolve => {
            setTimeout(() => resolve(votesController.getVotes()), 100)
        })
    },

    async addOrUpdateVote(filmId, category) {
        return new Promise(resolve => {
            setTimeout(() => resolve(votesController.addOrUpdateVote(filmId, category)), 100)
        })
    },

    async removeVote(filmId, category) {
        return new Promise(resolve => {
            setTimeout(() => resolve(votesController.removeVote(filmId, category)), 100)
        })
    }
}
