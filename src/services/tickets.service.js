import LocalSource from "@/services/localsource.service.js";

async function getFilmTicketsFromLocalSource(){
    return LocalSource.getFilmTickets();
}

export async function getFilmTickets(){
    let response = null;
    try {
        response = await getFilmTicketsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les tickets'}
    }
    return response;
}

async function createTicketFromLocalSource(){
    return LocalSource.createTicket();
}

export async function createTicket(){
    let response = null;
    try {
        response = await createTicketFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créer le ticket'}
    }
    return response;
}


async function getBilletsByUserIdFromLocalSource(id){
    return LocalSource.getBilletsByUserId(id);
}

export async function getBilletsByUserId(id){
    let response = null;
    try {
        response = await getBilletsByUserIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les billets par l\'id de l\'utilisateur'}
    }
    return response;
}

export default {
    getFilmTickets,
    createTicket,
    getBilletsByUserId
}