import LocalSource from "@/services/localsource.service.js";

async function getReservationsFromLocalSource(){
    return LocalSource.getReservations();
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


export default {
    getReservations
}