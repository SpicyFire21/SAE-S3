import standController from "@/datasource/controller/stands.controller.js"

async function getStandsFromLocalSource(){
    return standController.getStands();
}

async function getStandsTypesFromLocalSource() {
    return standController.getStandsTypes();
}

async function getStandByIdFromLocalSource(id) {
    return standController.getStandById(id)
}

export async function getStandById(id){
    let response = null;
    try {
        response = await getStandByIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le stand'}
    }
    return response;
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
    getStands, getStandsTypes, getStandById
}