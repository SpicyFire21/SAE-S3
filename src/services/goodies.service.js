import goodiesController from "@/datasource/controller/goodies.controller.js"
import {deleteRequest, getRequest, patchRequest, postRequest, putRequest} from "@/services/axios.service.js";

async function getBasketByUserIdFromLocalSource(id){
    return goodiesController.getBasketByUserId(id);
}

async function getBasketByUserIdFromAPI(id){
    return getRequest(`/baskets/current/${id}`,"GET-CURRENT-BASKET");
}

async function getBasketByUserId(id){
    let response = null;
    try {
        // response = await getBasketByUserIdFromLocalSource(id);
        response = await getBasketByUserIdFromAPI(id);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le panier de lutilisateur'}
    }
    return response;
}

async function getBasketItemsFromAPI(id){
    return getRequest(`/baskets/${id}/items`,"GET-CURRENT-BASKET-ITEMS");
}
async function getBasketItems(id){
    let response = null;
    try {
        // response = await getBasketItemsFromLocalSource(id);
        response = await getBasketItemsFromAPI(id);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le goodies'}
    }
    return response;
}


async function getGoodiesByProviderIdFromLocalSource(data){
    return goodiesController.getGoodiesByProviderId(data);
}
async function getGoodiesByProviderIdFromAPI(id){
    return getRequest(`/goodies/${id}`,"GET-CURRENT-BASKET-ITEMS");

}
async function getGoodiesByProviderId(id){
    let response = null;
    try {
        // response = await getGoodiesByProviderIdFromLocalSource(id);
        response = await getGoodiesByProviderIdFromAPI(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les goodies du prestataire'}
    }
    return response;
}

async function getColorsFromLocalSource(){
    return goodiesController.getColors();
}

async function getColorsFromAPI(){
    return getRequest("/colors","GET-COLORS");
}
async function getColors(){
    let response = null;
    try {
        // response = await getColorsFromLocalSource();
        response = await getColorsFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les couleurs'}
    }
    return response;
}

async function getSizesFromLocalSource(){
    return goodiesController.getSizes();
}
async function getSizesFromAPI(){
    return getRequest("/sizes","GET-SIZES");
}
async function getSizes(){
    let response = null;
    try {
        // response = await getSizesFromLocalSource();
        response = await getSizesFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les tailles'}
    }
    return response;
}

async function addGoodieFromLocalSource(d){
    return goodiesController.addGoodie(d);
}

async function addGoodieFromAPI(data){
    return postRequest("/goodies",data,"ADD-GOODIE");
}

async function addGoodie(data){
    let response = null;
    try {
        // response = await addGoodieFromLocalSource(data);
        response = await addGoodieFromAPI(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créé le goodie'}
    }
    return response;
}

async function updateGoodieFromLocalSource(d,userid){
    return goodiesController.updateGoodie(d,userid);
}

async function updateGoodieFromAPI(d,userid){
    return putRequest(`/goodies/${userid}`,d,"EDIT-GOODIE");
}

async function updateGoodie(d,userid){
    let response = null;
    try {
        // response = await updateGoodieFromLocalSource(d,userid);
        response = await updateGoodieFromAPI(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de modifier le goodie'}
    }
    return response;
}

async function getGoodiesFromLocalSource(){
    return goodiesController.getGoodies();
}

async function getGoodiesFromAPI(){
    return getRequest("/goodies","GET-GOODIES");
}

async function getGoodies(){
    let response = null;
    try {
        // response = await getGoodiesFromLocalSource();
        response = await getGoodiesFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les goodies'}
    }
    return response;
}

async function getGoodiesSizesFromLocalSource(){
    return goodiesController.getGoodiesSizes();
}

async function getGoodiesSizesFromAPI(){
    return getRequest("/goodies/sizes","GET-GOODIES-SIZES");
}

async function getGoodiesSizes(){
    let response = null;
    try {
        // response = await getGoodiesSizesFromLocalSource();
        response = await getGoodiesSizesFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les tailles de goodies'}
    }
    return response;
}

async function getGoodiesColorsFromLocalSource(){
    return goodiesController.getGoodiesColors();
}

async function getGoodiesColorsFromAPI(){
    return getRequest("/goodies/colors","GET-GOODIES-COLORS");
}


async function getGoodiesColors(){
    let response = null;
    try {
        // response = await getGoodiesColorsFromLocalSource();
        response = await getGoodiesColorsFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les couleurs de goodies'}
    }
    return response;
}

async function addColorFromLocalSource(data){
    return goodiesController.addColor(data);
}

async function addColorFromAPI(data){
    return postRequest("/colors",data,"ADD-COLOR");
}

async function addColor(data){
    let response = null;
    try {
        // response = await addColorFromLocalSource(data);
        response = await addColorFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une couleur'}
    }
    return response;
}

async function addSizeFromLocalSource(data){
    return goodiesController.addSize(data);
}

async function addSizeFromAPI(data){
    return postRequest("/sizes",data,"ADD-SIZE");
}

async function addSize(data){
    let response = null;
    try {
        // response = await addSizeFromLocalSource(data);
        response = await addSizeFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une taille'}
    }
    return response;
}

async function addGoodieColorFromLocalSource(data){
    return goodiesController.addGoodieColor(data);
}

async function addGoodieColorFromAPI(data){
    return postRequest("/goodies/colors",data,"ADD-GOODIES-COLOR");
}

async function addGoodieColor(data){
    let response = null;
    try {
        // response = await addGoodieColorFromLocalSource(data);
        response = await addGoodieColorFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une couleur de goodie '}
    }
    return response;
}

async function addGoodieSizeFromLocalSource(data){
    return goodiesController.addGoodieSize(data);
}

async function addGoodieSizeFromAPI(data){
    return postRequest("/goodies/sizes",data,"ADD-GOODIES-SIZE");
}
async function addGoodieSize(data){
    let response = null;
    try {
        // response = await addGoodieSizeFromLocalSource(data);
        response = await addGoodieSizeFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une taille de goodies'}
    }
    return response;
}

async function deleteAllColorsFromLocalSource(data){
    return goodiesController.deleteAllColors(data);
}

async function deleteAllColorsFromAPI(data){
    return deleteRequest(`/goodies/${data}/colors`,"DELETE-ALL-COLORS");
}

async function deleteAllColors(data){
    let response = null;
    try {
        // response = await deleteAllColorsFromLocalSource(data);
        response = await deleteAllColorsFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer les couleurs du goodies'}
    }
    return response;
}

async function deleteAllSizesFromLocalSource(data){
    return goodiesController.deleteAllSizes(data);
}

async function deleteAllSizesFromAPI(data){
    return deleteRequest(`/goodies/${data}/sizes`,"DELETE-ALL-SIZES");
}

async function deleteAllSizes(data){
    let response = null;
    try {
        // response = await deleteAllSizesFromLocalSource(data);
        response = await deleteAllSizesFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer les tailles du goodies'}
    }
    return response;
}


async function payOrderFromLocalSource(data){
    return goodiesController.payOrder(data);
}

async function payOrderFromAPI(data){
    return patchRequest(`/baskets/${data}`,data,"PAY-ORDER");
}

async function payOrder(data){
    let response = null;
    try {
        // response = await payOrderFromLocalSource(data);
        response = await payOrderFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de payer la commande'}
    }
    return response;
}

async function addBasketItemsFromLocalSource(data){
    return goodiesController.addBasketItems(data);
}

async function addBasketItemsFromAPI(data){
    return postRequest("/baskets/items",data,"ADD-BASKET-ITEM");
}

async function addBasketItems(data){
    let response = null;
    try {
        // response = await addBasketItemsFromLocalSource(data);
        response = await addBasketItemsFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter des goodies dans le panier'}
    }
    return response;
}



async function getAllBasketByUserIdFromLocalSource(data){
    return goodiesController.getAllBasketByUserId(data);
}

async function getAllBasketByUserIdFromAPI(data){
    return getRequest(`/baskets/${data}`,"GET-ALL-BASKETS-BY-USER-ID");
}

async function getAllBasketByUserId(data){
    let response = null;
    try {
        // response = await getAllBasketByUserIdFromLocalSource(data);
        response = await getAllBasketByUserIdFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récuperer l\'historique des paniers'}
    }
    return response;
}

async function getAllBasketItemsFromLocalSource(){
    return goodiesController.getAllBasketItems();
}

async function getAllBasketItemsFromAPI(){
    return getRequest("/baskets/items","GET-BASKET-ITEMS");
}

async function getAllBasketItems(){
    let response = null;
    try {
        // response = await getAllBasketItemsFromLocalSource(data);
        response = await getAllBasketItemsFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récuperer les goodies des paniers'}
    }
    return response;
}


async function removeFromBasketFromLocalSource(data){
    return goodiesController.removeFromBasket(data);
}

async function removeFromBasketFromAPI(data){
    return deleteRequest(`/baskets/${data.idbasket}/items/${data.idgoodie}/${data.idcolor}/${data.idsize}`,"DELETE-GOODIE-FROM-BASKET");
}

async function removeFromBasket(data){
    let response = null;
    try {
        // response = await removeFromBasketFromLocalSource(data);
        response = await removeFromBasketFromAPI(data);

    } catch (err){
        console.error(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer le goodie du panier'}
    }
    return response;
}


export default {
    getBasketByUserId,
    getBasketItems,
    getGoodiesByProviderId,
    getColors,
    getSizes,
    addGoodie,
    updateGoodie,
    getGoodies,
    getGoodiesSizes,
    getGoodiesColors,
    addColor,
    addSize,
    addGoodieSize,
    addGoodieColor,
    deleteAllColors,
    deleteAllSizes,
    payOrder,
    addBasketItems,
    getAllBasketByUserId,
    getAllBasketItems,
    removeFromBasket
}