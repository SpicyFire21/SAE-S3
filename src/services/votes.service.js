import votesController from "@/datasource/controller/votes.controller.js"

export async function addOrUpdateVote(data) {
    try {
        return await votesController.addOrUpdateVote(data)
    } catch (err) {
        console.error("Controller votes error:", err)
        return { error: 1, status: 500, data: "Erreur réseau, impossible d’ajouter un vote." }
    }
}

export async function removeVote(data) {
    try {
        return await votesController.removeVote(data)
    } catch (err) {
        console.error("Controller votes error:", err)
        return { error: 1, status: 500, data: "Erreur réseau, impossible de supprimer le vote." }
    }
}

export async function getVotes() {
    try {
        return await votesController.getVotes()
    } catch {
        return { error: 1, status: 500, data: "Erreur réseau, impossible de charger les votes." }
    }
}

export async function resetVotes() {
    try {
        return await votesController.resetVotes()
    } catch {
        return { error: 1, status: 500, data: "Erreur réseau, impossible de réinitialiser les votes." }
    }
}

export default {
    addOrUpdateVote,
    removeVote,
    getVotes,
    resetVotes
}
