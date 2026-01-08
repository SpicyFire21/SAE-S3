import {
    films,
    projections,
    users,
    genres,
    film_genres,
    film_cast,
    goodies,
    reservations,
    films_reservations,
    film_request_genres,
    film_requests
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
    console.log(projections)

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
    console.log(projections)
    // projections.push(projection)
    return {error: 0, status: 201, data: projection}
}

/*async function addCast({ film_id, user_id }) {
    if (!film_id || !user_id) {
        return { error: 1, status: 400, data: "film_id ou user_id manquant" };
    }

    // Vérifie si le cast existe déjà
    const exists = film_cast.find(fc => fc.film_id === film_id && fc.user_id === user_id);
    if (exists) {
        return { error: 1, status: 409, data: "Ce cast existe déjà pour ce film" };
    }

    const newCast = { film_id, user_id };
    film_cast.push(newCast);

    return { error: 0, status: 201, data: newCast };
}

async function removeCast({ film_id, user_id }) {
    if (!film_id || !user_id) {
        return { error: 1, status: 400, data: "film_id ou user_id manquant" };
    }

    const index = film_cast.findIndex(fc => fc.film_id === film_id && fc.user_id === user_id);
    if (index === -1) {
        return { error: 1, status: 404, data: "Cast non trouvé pour ce film" };
    }

    const deleted = film_cast.splice(index, 1)[0];
    return { error: 0, status: 204, data: deleted };
}*/


async function addFilm(data) {
    if (!data.title || !data.director_id || !data.release_date || !data.description || !data.duration) {
        return { error: 1, status: 400, data: "Données manquantes pour créer le film" };
    }

    const newFilm = {
        id: uuidv4(),
        title: data.title,
        director_id: data.director_id,
        release_date: data.release_date,
        poster: data.poster || "",
        description: data.description,
        duration: data.duration,
    };

    if (Array.isArray(data.genreIds)) {
        data.genreIds.forEach(genreId => {
            if (genres.find(g => g.id === genreId)) {
                film_genres.push({ filmId: newFilm.id, genreId });
            }
        });
    }

    //films.push(newFilm);
    return { error: 0, status: 201, data: newFilm };
}

async function deleteFilm(id) {
    const index = films.findIndex(f => f.id === id);
    if (index === -1) {
        return { error: 1, status: 404, data: "Film introuvable" };
    }

    const deleted = films.splice(index, 1)[0];

    // nettoie les genres associés
    for (let i = film_genres.length - 1; i >= 0; i--) {
        if (film_genres[i].filmId === id) {
            film_genres.splice(i, 1);
        }
    }

    // nettoie le cast associé
    for (let i = film_cast.length - 1; i >= 0; i--) {
        if (film_cast[i].film_id === id) {
            film_cast.splice(i, 1);
        }
    }

    return { error: 0, status: 204, data: deleted };
}

async function getFilmRequests() {
    return { error: 0, status: 200, data: film_requests };
}

async function getFilmRequestsGenres() {
    return { error: 0, status: 200, data: film_request_genres };
}

async function addFilmRequest(data) {
    if (!data.title || !data.director_id || !data.release_date || !data.description || !data.duration) {
        return { error: 1, status: 400, data: "Données manquantes pour créer la requête de film" };
    }

    const newRequest = {
        id: uuidv4(),
        title: data.title,
        director_id: data.director_id,
        release_date: data.release_date,
        poster: data.poster || "",
        description: data.description,
        duration: data.duration,
    };

    //film_requests.push(newRequest);
    return { error: 0, status: 201, data: newRequest };
}

async function deleteFilmRequest(id) {
    const index = film_requests.findIndex(r => r.id === id);
    if (index === -1) {
        return { error: 1, status: 404, data: "Requête de film introuvable" };
    }

    const deleted = film_requests.splice(index, 1)[0];

    return { error: 0, status: 204, data: deleted };
}



export default {

    getFilms,
    getFilmById,


    getGenres,
    getGenreById,

    getFilmGenres,
    getFilmCast,
    //addCast,
    //removeCast,

    getProjections,
    updateProjection,
    deleteProjection,
    addProjection,

    addFilm,
    deleteFilm,

    addFilmRequest,
    deleteFilmRequest,
    getFilmRequests,
    getFilmRequestsGenres

}
