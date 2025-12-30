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

async function getTypeStandByIdFromLocalSource(id) {
    return standController.getStandTypeById(id)
}

async function getStandsReservationsRequestsFromLocalSource() {
    return standController.getStandsReservationsRequests();
}

async function addStandRequestFromLocalSource(data) {
    return standController.addStandRequest(data)
}

export async function addStandRequest(data){
    let response = null;
    try {
        response = await addStandRequestFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter une requete pour ce stand'}
    }
    return response;
}

export async function getStandsReservationsRequests(){
    let response = null;
    try {
        response = await getStandsReservationsRequestsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les requests des stands'}
    }
    return response;
}

export async function getStandTypeById(id){
    let response = null;
    try {
        response = await getTypeStandByIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le stand'}
    }
    return response;
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
    getStands, getStandsTypes, getStandById, getStandTypeById, addStandRequest, getStandsReservationsRequests
}