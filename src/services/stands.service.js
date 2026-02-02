import standController from "@/datasource/controller/stands.controller.js"
import {getRequest, postRequest} from "@/services/axios.service.js";

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

async function getStandsFromAPI(){
    return getRequest("/stands","GET-STANDS");
}

async function getStandsTypesFromAPI() {
    return getRequest("/stands/types","GET-STANDS-TYPES");
}

async function getStandByIdFromAPI(id) {
    return getRequest(`/stands/${id}`,"GET-STANDS-BY-ID");}

async function getTypeStandByIdFromAPI(id) {
    return getRequest(`/stands/types/${id}`,"GET-STANDS-TYPES-BY-ID");
}

async function getStandsReservationsRequestsFromAPI() {
    return getRequest(`/stands/reservations`,"GET-STANDS-RESERVATIONS");
}

async function addStandRequestFromAPI(data) {
    return postRequest(`/stands/reservations`,data,"ADD-STANDS-RESERVATIONS");
}

export async function addStandRequest(data){
    let response = null;
    try {
        // response = await addStandRequestFromLocalSource(data);
        response = await addStandRequestFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter une requete pour ce stand'}
    }
    return response;
}

export async function getStandsReservationsRequests(){
    let response = null;
    try {
        // response = await getStandsReservationsRequestsFromLocalSource();
        response = await getStandsReservationsRequestsFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les requests des stands'}
    }
    return response;
}

export async function getStandTypeById(id){
    let response = null;
    try {
        // response = await getTypeStandByIdFromLocalSource(id);
        response = await getTypeStandByIdFromAPI(id);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le stand'}
    }
    return response;
}


export async function getStandById(id){
    let response = null;
    try {
        // response = await getStandByIdFromLocalSource(id);
        response = await getStandByIdFromAPI(id);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le stand'}
    }
    return response;
}


export async function getStands(){
    let response = null;
    try {
        // response = await getStandsFromLocalSource();
        response = await getStandsFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les stands'}
    }
    return response;
}

export async function getStandsTypes(){
    let response = null;
    try {
        // response = await getStandsTypesFromLocalSource();
        response = await getStandsTypesFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les types de stands'}
    }
    return response;
}

export default {
    getStands, getStandsTypes, getStandById, getStandTypeById, addStandRequest, getStandsReservationsRequests
}