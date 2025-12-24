import {films, projections, users} from "@/datasource/data.js";


async function getFilms() {
    return {error:0, status:200, data:films}
}
async function getFilmDirector(director_id) {
    const director = users.find(user => user.id === director_id)
    return { error: 0, status: 200, data: director }
}
async function getProjections() {
    return {error:0, status:200, data:projections}
}

export default {

    getFilms,

    getFilmDirector,
    getProjections
}
