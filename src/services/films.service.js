import filmsController from "@/datasource/controller/films.controller.js"

async function getProjectionsFromLocalSource() {
    return filmsController.getProjections();
}

export async function getProjections(){
    let response = null;
    try {
        response = await getProjectionsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les projections'}
    }
    return response;
}

async function getFilmsFromLocalSource(){
    return filmsController.getFilms();
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

async function getGenresFromLocalSource(){
    return filmsController.getGenres();
}

export async function getGenres(){
    let response = null;
    try {
        response = await getGenresFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les genres'}
    }
    return response;
}


async function getFilmGenresFromLocalSource(){
    return filmsController.getFilmGenres();
}

export async function getFilmGenres(){
    let response = null;
    try {
        response = await getFilmGenresFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les genres de ce film'}
    }
    return response;
}


async function getFilmCastFromLocalSource(){
    return filmsController.getFilmCast();
}

export async function getFilmCast(){
    let response = null;
    try {
        response = await getFilmCastFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le cast'}
    }
    return response;
}



async function getGenreByIdFromLocalSource(id) {
    return filmsController.getGenreById(id)
}

export async function getGenreById(id) {
    let response = null;
    try {
        response = await getGenreByIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le genre avec cet id'}
    }
    return response;
}


async function getFilmByIdFromLocalSource(id) {
    return filmsController.getFilmById(id)
}

export async function getFilmById(id) {
    let response = null;
    try {
        response = await getFilmByIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le film avec cet id'}
    }
    return response;
}

async function updateProjectionFromLocalSource(projection) {
    return filmsController.updateProjection(projection)
}

export async function updateProjection(projection) {
    let response = null;
    try {
        response = await updateProjectionFromLocalSource(projection);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de modifier la projection'}
    }
    return response;
}

async function deleteProjectionFromLocalSource(projection) {
    return filmsController.deleteProjection(projection)
}

export async function deleteProjection(projection) {
    let response = null;
    try {
        response = await deleteProjectionFromLocalSource(projection);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer la projection'}
    }
    return response;
}

async function addProjectionFromLocalSource(projection) {
    return filmsController.addProjection(projection)
}

export async function addProjection(projection) {
    let response = null;
    try {
        response = await addProjectionFromLocalSource(projection);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter la projection'}
    }
    return response;
}




export default {
    getFilms,
    getProjections,
    getFilmCast, getFilmGenres, getGenres, getFilmById, getGenreById,updateProjection, deleteProjection, addProjection
}