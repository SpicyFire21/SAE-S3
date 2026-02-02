import adminController from "@/datasource/controller/admin.controller.js"
import {deleteRequest, getRequest, postRequest} from "@/services/axios.service.js";

async function getProvidersRequestsFromLocalSource(){
    return adminController.getProvidersRequests();
}

async function getProvidersRequestsFromAPI(){
    return getRequest("/providers/requests","PROVIDER-REQUEST")
}

export async function getProvidersRequests(){
    let response = null;
    try {
        // response = await getProvidersRequestsFromLocalSource();
        response = await getProvidersRequestsFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les demandes de prestataires'}
    }
    return response;
}

async function addProviderRequestFromLocalSource(data){
    return adminController.addProviderRequest(data);
}

async function addProviderRequestFromAPI(data){
    return postRequest("/providers/requests",data,"ADD-PROVIDER");
}

async function addProviderRequest(data){
    let response = null;
    try {
        // response = await addProviderRequestFromLocalSource(data);
        response = await addProviderRequestFromAPI(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créer une demande de prestataire'}
    }
    return response;
}

async function deleteProviderRequestsFromLocalSource(data){
    return adminController.deleteProviderRequests(data);
}

async function deleteProviderRequestsFromAPI(data){
    return deleteRequest(`/providers/requests/${data}`,"DELETE-PROVIDER-REQUEST");
}

async function deleteProviderRequests(data){
    let response = null;
    try {
        // response = await deleteProviderRequestsFromLocalSource(data);
        response = await deleteProviderRequestsFromAPI(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer une demande de prestataire'}
    }
    return response;
}

export default {
    getProvidersRequests,
    addProviderRequest,
    deleteProviderRequests
}