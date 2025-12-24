import LocalSource from "@/services/localsource.service.js";

async function getReservationsFromLocalSource(){
    return LocalSource.getReservations();
}

async function getFilmsReservationsFromLocalSource(){
    return LocalSource.getFilmsReservations();
}

async function getAutographsReservationsFromLocalSource(){
    return LocalSource.getAutographReservations();
}

async function addFilmReservationFromLocalSource(data) {
    return LocalSource.addFilmReservation(data);
}

async function getReservationByIdUserFromLocalSource(id) {
    return LocalSource.getReservationByIdUser(id)
}

async function getFilmFromReservationFromLocalSource(reservation) {
    return LocalSource.getFilmFromReservation(reservation)
}

export async function getFilmFromReservation(reservation){
    let response = null;
    try {
        response = await getFilmFromReservationFromLocalSource(reservation);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer le nom de ce film'}
    }
    return response;
}

export async function getReservationByIdUser(id){
    let response = null;
    try {
        response = await getReservationByIdUserFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer des reservations pour cet utilisateur'}
    }
    return response;
}

export async function addFilmReservation(data){
    let response = null;
    try {
        response = await addFilmReservationFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter un film'}
    }
    return response;
}

export async function getReservations(){
    let response = null;
    try {
        response = await getReservationsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les reservations'}
    }
    return response;
}

export async function getFilmsReservations(){
    let response = null;
    try {
        response = await getFilmsReservationsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les reservations de films'}
    }
    return response;
}

export async function getAutographsReservations(){
    let response = null;
    try {
        response = await getAutographsReservationsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les reservations des autographes'}
    }
    return response;
}


export default {
    getReservations, getAutographsReservations, getFilmsReservations, addFilmReservation, getReservationByIdUser, getFilmFromReservation
}