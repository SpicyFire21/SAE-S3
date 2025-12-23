import LocalSource from "@/services/localsource.service.js";

async function getStandsFromLocalSource(){
    return LocalSource.getStands();
}

async function getStandsTypesFromLocalSource() {
    return LocalSource.getStandsTypes();
}

export async function getStands(){
    let response = null;
    try {
        response = await getStandsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les stands'}
    }
    return response;
}

export async function getStandsTypes(){
    let response = null;
    try {
        response = await getStandsTypesFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les types de stands'}
    }
    return response;
}

export default {
    getStands, getStandsTypes
}