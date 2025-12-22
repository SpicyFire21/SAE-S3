import LocalSource from "@/services/localsource.service.js";

async function getStandsFromLocalSource(){
    return LocalSource.getStands();
}

export async function getStands(){
    let response = null;
    try {
        response = await getStandsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les films'}
    }
    return response;
}

export default {
    getStands,
}