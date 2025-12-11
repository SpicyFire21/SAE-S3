import LocalSource from "@/services/localsource.service.js";

async function getProvidersRequestsFromLocalSource(){
    return LocalSource.getProvidersRequests();
}

export async function getProvidersRequests(){
    let response = null;
    try {
        response = await getProvidersRequestsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les demandes de prestataires'}
    }
    return response;
}

async function addProviderRequestFromLocalSource(data){
    return LocalSource.addProviderRequest(data);
}

async function addProviderRequest(data){
    let response = null;
    try {
        response = await addProviderRequestFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créer une demande de prestataire'}
    }
    return response;
}

async function deleteProviderRequestsFromLocalSource(data){
    return LocalSource.deleteProviderRequests(data);
}

async function deleteProviderRequests(data){
    let response = null;
    try {
        response = await deleteProviderRequestsFromLocalSource(data);
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