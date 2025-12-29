import {films, projections, users, genres, film_genres, film_cast} from "@/datasource/data.js";


async function getFilms() {
    return {error:0, status:200, data:films}
}

async function getFilmById(id) {
    const film = films.find(f => f.id === id)
    return {error:0, status:200, data:films}
}

async function getGenreById(id) {
    const filmGenres = genres.filter(g => g.id === id)
    console.log("AEEZ" + JSON.stringify(filmGenres))
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

export default {

    getFilms,
    getGenres,
    getFilmGenres,
    getFilmCast,
    getProjections,
    getFilmById,
    getGenreById
}
