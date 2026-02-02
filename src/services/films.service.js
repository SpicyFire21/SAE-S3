import filmsController from "@/datasource/controller/films.controller.js"
import {deleteRequest, getRequest, postRequest, putRequest} from "@/services/axios.service.js";

async function getProjectionsFromLocalSource() {
    return filmsController.getProjections();
}

async function getProjectionsFromAPI() {
    return getRequest("/projections","GET-PROJECTIONS")
}

export async function getProjections(){
    let response = null;
    try {
        // response = await getProjectionsFromLocalSource();
        response = await getProjectionsFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les projections'}
    }
    return response;
}

async function getFilmsFromLocalSource(){
    return filmsController.getFilms();
}

async function getFilmsFromAPI(){
    return getRequest("/films","GET-FILMS")
}

export async function getFilms(){
    let response = null;
    try {
        // response = await getFilmsFromLocalSource();
        response = await getFilmsFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les films'}
    }
    return response;
}

async function getGenresFromLocalSource(){
    return filmsController.getGenres();
}

async function getGenresFromAPI(){
    return getRequest("/genres","GET-GENRES")
}

export async function getGenres(){
    let response = null;
    try {
        // response = await getGenresFromLocalSource();
        response = await getGenresFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les genres'}
    }
    return response;
}


async function getFilmGenresFromLocalSource(){
    return filmsController.getFilmGenres();
}

async function getFilmGenresFromAPI(){
    return getRequest("/films/genres","GET-FILMS-GENRES")
}

export async function getFilmGenres(){
    let response = null;
    try {
        // response = await getFilmGenresFromLocalSource();
        response = await getFilmGenresFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les genres de ce film'}
    }
    return response;
}


async function getFilmCastFromLocalSource(){
    return filmsController.getFilmCast();
}

async function getFilmCastFromAPI(){
    return getRequest("/films/casts","GET-FILMS-CASTS");
}

export async function getFilmCast(){
    let response = null;
    try {
        // response = await getFilmCastFromLocalSource();
        response = await getFilmCastFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le cast'}
    }
    return response;
}



async function getGenreByIdFromLocalSource(id) {
    return filmsController.getGenreById(id)
}

async function getGenreByIdFromAPI(id) {
    return getRequest(`/genres/${id}`,"GET-GENRES-BY-ID")
}

export async function getGenreById(id) {
    let response = null;
    try {
        // response = await getGenreByIdFromLocalSource(id);
        response = await getGenreByIdFromAPI(id)
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le genre avec cet id'}
    }
    return response;
}


async function getFilmByIdFromLocalSource(id) {
    return filmsController.getFilmById(id)
}

async function getFilmByIdFromAPI(id) {
    return getRequest(`/films/${id}`,"GET-FILMS-BY-ID")
}

export async function getFilmById(id) {
    let response = null;
    try {
        // response = await getFilmByIdFromLocalSource(id);
        response = await getFilmByIdFromAPI(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le film avec cet id'}
    }
    return response;
}

async function updateProjectionFromLocalSource(projection) {
    return filmsController.updateProjection(projection)
}

async function updateProjectionFromAPI(projection) {
    return "route manquante dans l'api"
}

export async function updateProjection(projection) {
    let response = null;
    try {
        // response = await updateProjectionFromLocalSource(projection);
        response = await updateProjectionFromAPI(projection);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de modifier la projection'}
    }
    return response;
}

async function deleteProjectionFromLocalSource(projection) {
    return filmsController.deleteProjection(projection)
}

async function deleteProjectionFromAPI(projection) {
    return "route manquante dans l'api"
}


export async function deleteProjection(projection) {
    let response = null;
    try {
        // response = await deleteProjectionFromLocalSource(projection);
        response = await deleteProjectionFromAPI(projection);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer la projection'}
    }
    return response;
}

async function addProjectionFromLocalSource(projection) {
    return filmsController.addProjection(projection)
}

async function addProjectionFromAPI(projection) {
    return "route manquante dans l'api"
}

export async function addProjection(projection) {
    let response = null;
    try {
        // response = await addProjectionFromLocalSource(projection);
        response = await addProjectionFromAPI(projection);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter la projection'}
    }
    return response;
}

async function addCastFromLocalSource(data) {
    return filmsController.addCast(data);
}

/*async function AddCast(data) {
    let res;
    try {
        res = await addCastFromLocalSource(data);
    } catch {
        res = { error: 1, status: 404, data: "Impossible d'ajouter le cast" };
    }
    return res;
}

async function removeCastFromLocalSource(data) {
    return filmsController.removeCast(data);
}

async function RemoveCast(data) {
    let res;
    try {
        res = await removeCastFromLocalSource(data);
    } catch {
        res = { error: 1, status: 404, data: "Impossible de supprimer le cast" };
    }
    return res;
}*/

async function addFilmFromLocalSource(data) {
    return filmsController.addFilm(data);
}

async function addFilmFromAPI(data) {
    return postRequest("/films",data,"ADD-FILM");
}

async function AddFilm(data) {
    let res;
    try {
        // res = await addFilmFromLocalSource(data);
        res = await addFilmFromAPI(data);

    } catch {
        res = { error: 1, status: 404, data: "erreur réseau, impossible d'ajouter le film" };
    }
    return res;
}


async function deleteFilmFromLocalSource(id) {
    return filmsController.deleteFilm(id);
}

async function deleteFilmFromAPI(id) {
    return deleteRequest(`/films/${id}`,"DELETE-FILM")
}

async function DeleteFilm(id) {
    let res;
    try {
        // res = await deleteFilmFromLocalSource(id);
        res = await deleteFilmFromAPI(id);
    } catch {
        res = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer le film" };
    }
    return res;
}

async function getFilmRequestsFromLocalSource() {
    return filmsController.getFilmRequests();
}

async function getFilmRequestsFromAPI() {
    return getRequest("/films/requests","GET-FILMS-REQUESTS");
}

async function GetFilmRequests() {
    let res;
    try {
        // res = await getFilmRequestsFromLocalSource();
        res = await getFilmRequestsFromAPI()
    } catch {
        res = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer les requêtes de films" };
    }
    return res;
}

async function getFilmGenresRequestsFromLocalSource() {
    return filmsController.getFilmRequestsGenres();
}

async function getFilmGenresRequestsFromAPI() {
    return getRequest("/films/requests/genres","GET-FILMS-REQUESTS-GENRES");
}

async function GetFilmGenresRequests() {
    let res;
    try {
        // res = await getFilmGenresRequestsFromLocalSource();
        res = await getFilmGenresRequestsFromAPI();
    } catch {
        res = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer les requêtes de films" };
    }
    return res;
}

async function addFilmRequestFromLocalSource(data) {
    return filmsController.addFilmRequest(data);
}

async function addFilmRequestFromAPI(data) {
    return postRequest("/films/requests",data,"ADD-FILM-REQUEST");
}

async function AddFilmRequest(data) {
    let res;
    try {
        // res = await addFilmRequestFromLocalSource(data);
        res = await addFilmRequestFromAPI(data);

    } catch {
        res = { error: 1, status: 404, data: "erreur réseau, impossible d'ajouter la requête de film" };
    }
    return res;
}

async function deleteFilmRequestFromLocalSource(id) {
    return filmsController.deleteFilmRequest(id);
}

async function deleteFilmRequestFromAPI(id) {
    return deleteRequest(`/films/requests/${id}`,"DELEE-FILM-REQUEST");
}

async function DeleteFilmRequest(id) {
    let res;
    try {
        // res = await deleteFilmRequestFromLocalSource(id);
        res = await deleteFilmRequestFromAPI(id);
    } catch {
        res = { error: 1, status: 404, data: "erreur réseau, impossible de supprimer la requête de film" };
    }
    return res;
}


export default {
    getFilms,
    getProjections,
    getFilmCast, getFilmGenres, getGenres, getFilmById, getGenreById,updateProjection, deleteProjection, addProjection,
    AddFilm,DeleteFilm,
    //AddCast, RemoveCast,
    AddFilmRequest, DeleteFilmRequest, GetFilmRequests, GetFilmGenresRequests
}