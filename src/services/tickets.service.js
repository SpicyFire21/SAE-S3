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

export default {
    getFilmTickets,
}