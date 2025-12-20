import LocalSource from "@/services/localsource.service.js";

async function getBasketByUserIdFromLocalSource(id){
    return LocalSource.getBasketByUserId(id);
}

async function getBasketByUserId(id){
    let response = null;
    try {
        response = await getBasketByUserIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le goodies'}
    }
    return response;
}

async function getBasketItemsFromLocalSource(id){
    return LocalSource.getBasketItems(id);
}

async function getBasketItems(id){
    let response = null;
    try {
        response = await getBasketItemsFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le goodies'}
    }
    return response;
}

export default {
    getBasketByUserId,
    getBasketItems
}