import LocalSource from "@/services/localsource.service.js";

async function getFilmsFromLocalSource(){
    return LocalSource.getFilms();
}

export async function getFilms(){
    let response = null;
    try {
        response = await getFilmsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les films'}
    }
    return response;
}

async function getFilmDirectorFromLocalSource(director_id) {
    return LocalSource.getFilmDirector(director_id)
}

export async function getFilmDirector(director_id) {
    let response = null;
    try {
        response = await getFilmDirectorFromLocalSource(director_id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le directeur de ce film'}
    }
    return response;
}

export default {
    getFilms,
    getFilmDirector
}