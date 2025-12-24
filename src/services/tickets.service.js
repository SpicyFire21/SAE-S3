import ticketController from "@/datasource/controller/tickets.controller.js"

async function getFilmTicketsFromLocalSource(){
    return ticketController.getFilmTickets();
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

async function createTicketFromLocalSource(data){
    return ticketController.createTicket(data);
}

export async function createTicket(data){
    let response = null;
    try {
        response = await createTicketFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créer le ticket'}
    }
    return response;
}


async function getBilletsByUserIdFromLocalSource(id){
    return ticketController.getBilletsByUserId(id);
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

async function getTicketsPriceFromLocalSource(){
    return ticketController.getTicketsPrice();
}

export async function getTicketsPrice(){
    let response = null;
    try {
        response = await getTicketsPriceFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les billets par l\'id de l\'utilisateur'}
    }
    return response;
}


export default {
    getFilmTickets,
    createTicket,
    getBilletsByUserId,
    getTicketsPrice
}