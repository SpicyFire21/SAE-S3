import ticketController from "@/datasource/controller/tickets.controller.js"
import {getRequest, postRequest} from "@/services/axios.service.js";

async function getFilmTicketsFromLocalSource(){
    return ticketController.getFilmTickets();
}

async function getFilmTicketsFromAPI(){
    return "route manquante dans l'api";
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
async function createTicketFromAPI(data){
    return postRequest("/tickets",data,"ADD-TICKET");
}

export async function createTicket(data){
    let response = null;
    try {
        // response = await createTicketFromLocalSource(data);
        response = await createTicketFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créer le ticket'}
    }
    return response;
}


async function getBilletsByUserIdFromLocalSource(id){
    return ticketController.getBilletsByUserId(id);
}

async function getBilletsByUserIdFromAPI(id){
    return getRequest(`/tickets/${id}`,"GET-TICKET-BY-ID");
}

export async function getBilletsByUserId(id){
    let response = null;
    try {
        // response = await getBilletsByUserIdFromLocalSource(id);
        response = await getBilletsByUserIdFromAPI(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les billets par l\'id de l\'utilisateur'}
    }
    return response;
}

async function getTicketsPriceFromLocalSource(){
    return ticketController.getTicketsPrice();
}

async function getTicketsPriceFromAPI(){
    return getRequest("/tickets/prices","GET-TICKETS-PRICES");
}

export async function getTicketsPrice(){
    let response = null;
    try {
        // response = await getTicketsPriceFromLocalSource();
        response = await getTicketsPriceFromAPI();
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