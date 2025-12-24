import { film_tickets } from "@/datasource/data.js"

export async function getVotes() {
    // Simule un appel API
    const stored = localStorage.getItem("pablos_votes")
    return { error: 0, status: 200, data: stored ? JSON.parse(stored) : [] }
}

export async function addVote(vote) {
    const stored = localStorage.getItem("pablos_votes")
    const votes = stored ? JSON.parse(stored) : []

    // Empêche double vote même user/film/catégorie
    const already = votes.find(
        v => v.userId === vote.userId && v.filmId === vote.filmId && v.category === vote.category
    )
    if (already) {
        throw new Error("Vote déjà enregistré pour cette catégorie")
    }

    votes.push(vote)
    localStorage.setItem("pablos_votes", JSON.stringify(votes))
    return { error: 0, status: 201, data: "vote enregistré" }
}

export default { getVotes, addVote }
