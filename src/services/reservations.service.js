import reservationController from "@/datasource/controller/reservations.controller.js"
import {getRequest, postRequest} from "@/services/axios.service.js";

async function getReservationsFromAPI(){
    return getRequest("/reservations", "GET-RESERVATIONS");
}

async function getFilmsReservationsFromAPI(){
    return "route manquante dans l'api";
}

async function getAutographsReservationsFromAPI(){
    return "route manquante dans l'api";
}

async function addFilmReservationFromAPI(data) {
    return postRequest("/films/reservation", data, "ADD-RESERVATIONS");
}

async function addAutographReservationFromAPI(data) {
    return "route manquante dans l'api";
}

async function getReservationByIdUserFromAPI(id) {
    return "route manquante dans l'api"
}

async function getEventFromReservationFromAPI(reservation) {
    return "route manquante dans l'api"
}






export async function getEventFromReservation(reservation){
    let response = null;
    try {
        // response = await getEventFromReservationFromLocalSource(reservation);
        response = await getEventFromReservationFromAPI(reservation);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer le nom de ce film'}
    }
    return response;
}

export async function getReservationByIdUser(id){
    let response = null;
    try {
        // response = await getReservationByIdUserFromLocalSource(id);
        response = await getReservationByIdUserFromAPI(id);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer des reservations pour cet utilisateur'}
    }
    return response;
}

export async function addAutographReservation(data){
    let response = null;
    try {
        // response = await addAutographReservationFromLocalSource(data);
        response = await addAutographReservationFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter un film'}
    }
    return response;
}

export async function addFilmReservation(data){
    let response = null;
    try {
        // response = await addFilmReservationFromLocalSource(data);
        response = await addFilmReservationFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter un film'}
    }
    return response;
}

export async function getReservations(){
    let response = null;
    try {
        response = await getReservationsFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les reservations'}
    }
    return response;
}

export async function getFilmsReservations(){
    let response = null;
    try {
        // response = await getFilmsReservationsFromLocalSource();
        response = await getFilmsReservationsFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les reservations de films'}
    }
    return response;
}

export async function getAutographsReservations(){
    let response = null;
    try {
        // response = await getAutographsReservationsFromLocalSource();
        response = await getAutographsReservationsFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les reservations des autographes'}
    }
    return response;
}


export default {
    getReservations,
    getAutographsReservations,
    getFilmsReservations,
    addFilmReservation,
    getReservationByIdUser,
    getEventFromReservation,
    addAutographReservation
}