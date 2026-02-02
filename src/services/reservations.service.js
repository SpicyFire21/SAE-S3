import reservationController from "@/datasource/controller/reservations.controller.js"
import {getRequest} from "@/services/axios.service.js";

async function getReservationsFromLocalSource(){
    return reservationController.getReservations();
}

async function getFilmsReservationsFromLocalSource(){
    return reservationController.getFilmsReservations();
}

async function getAutographsReservationsFromLocalSource(){
    return reservationController.getAutographReservations();
}

async function addFilmReservationFromLocalSource(data) {
    return reservationController.addFilmReservation(data);
}

async function addAutographReservationFromLocalSource(data) {
    return reservationController.addAutographReservation(data);
}

async function getReservationByIdUserFromLocalSource(id) {
    return reservationController.getReservationByIdUser(id)
}

async function getEventFromReservationFromLocalSource(reservation) {
    return reservationController.getEventFromReservation(reservation)
}


async function getReservationsFromAPI(){
    return "route manquante dans l'api";
}

async function getFilmsReservationsFromAPI(){
    return "route manquante dans l'api";
}

async function getAutographsReservationsFromAPI(){
    return "route manquante dans l'api";
}

async function addFilmReservationFromAPI(data) {
    return "route manquante dans l'api";
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
        // response = await getReservationsFromLocalSource();
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