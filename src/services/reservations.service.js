import reservationController from "@/datasource/controller/reservations.controller.js"
import {getRequest, postRequest} from "@/services/axios.service.js";

async function getReservationsFromAPI(){
    return getRequest("/reservations", "GET-RESERVATIONS");
}

async function getFilmsReservationsFromAPI(){
    return getRequest("/films/reservations","GET-FILMS-RESERVATIONS");
}

async function getAutographsReservationsFromAPI(){
    return getRequest("/autographs/reservations","GET-AUTOGRAPHS-RESERVATIONS");
}

async function addFilmReservationFromAPI(data) {
    return postRequest("/films/reservation", data, "ADD-RESERVATIONS");
}

async function addAutographReservationFromAPI(data) {
    return postRequest("/autographs/reservations",data,"ADD-AUTOGRAPHS-RESERVATIONS");
}

async function getEventFromReservationFromAPI(id) {
    return getRequest(`/reservations/${id}/event`,"GET-EVENT-BY-RESERVATIONS-BY")
}






export async function getEventFromReservation(id) {
    let response = null;
    try {
        // response = await getEventFromReservationFromLocalSource(reservation);
        response = await getEventFromReservationFromAPI(id);

    } catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de recuperer le nom de ce film'}
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
    getEventFromReservation,
    addAutographReservation
}