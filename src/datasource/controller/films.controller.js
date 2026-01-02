import {
    films,
    projections,
    users,
    genres,
    film_genres,
    film_cast,
    goodies,
    reservations,
    films_reservations
} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'


async function getFilms() {
    return {error:0, status:200, data:films}
}

async function getFilmById(id) {
    const film = films.find(f => f.id === id)
    return {error:0, status:200, data:film}
}

async function getGenreById(id) {
    const filmGenres = genres.filter(g => g.id === id)
    return {error:0, status:200, data:filmGenres}
}

async function getGenres() {
    return {error: 0, status: 200, data:genres}
}

async function getFilmGenres() {
    return {error: 0, status: 200, data:film_genres}
}

async function getFilmCast() {
    return {error: 0, status: 200, data:film_cast}
}
async function getProjections() {
    return {error:0, status:200, data:projections}
}

async function updateProjection(projection) {
    return { error: 0, status: 200, data: projection };
}

async function deleteProjection(projection) {
    return { error: 0, status: 200, data: projection };
}

async function addProjection(data) {
    const projection = {
        id: uuidv4(),
        standId: data.standId,
        filmId: data.filmId,
        date: data.date,
    }

    // projections.push(projection)
    return {error: 0, status: 201, data: projection}
}

export default {

    getFilms,
    getFilmById,


    getGenres,
    getGenreById,

    getFilmGenres,
    getFilmCast,

    getProjections,
    updateProjection,
    deleteProjection,
    addProjection

}
