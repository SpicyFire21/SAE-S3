import goodiesController from "@/datasource/controller/goodies.controller.js"

async function getBasketByUserIdFromLocalSource(id){
    return goodiesController.getBasketByUserId(id);
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
    return goodiesController.getBasketItems(id);
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


async function getGoodiesByProviderIdFromLocalSource(data){
    return goodiesController.getGoodiesByProviderId(data);
}
async function getGoodiesByProviderId(data){
    let response = null;
    try {
        response = await getGoodiesByProviderIdFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les goodies du prestataire'}
    }
    return response;
}

async function getColorsFromLocalSource(){
    return goodiesController.getColors();
}
async function getColors(){
    let response = null;
    try {
        response = await getColorsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les couleurs'}
    }
    return response;
}

async function getSizesFromLocalSource(){
    return goodiesController.getSizes();
}
async function getSizes(){
    let response = null;
    try {
        response = await getSizesFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les tailles'}
    }
    return response;
}

async function addGoodieFromLocalSource(d){
    return goodiesController.addGoodie(d);
}
async function addGoodie(d){
    let response = null;
    try {
        response = await addGoodieFromLocalSource(d);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créé le goodie'}
    }
    return response;
}

async function updateGoodieFromLocalSource(d,userid){
    return goodiesController.updateGoodie(d,userid);
}
async function updateGoodie(d,userid){
    let response = null;
    try {
        response = await updateGoodieFromLocalSource(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de modifier le goodie'}
    }
    return response;
}

async function getGoodiesFromLocalSource(d,userid){
    return goodiesController.getGoodies(d,userid);
}
async function getGoodies(d,userid){
    let response = null;
    try {
        response = await getGoodiesFromLocalSource(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les goodies'}
    }
    return response;
}

async function getGoodiesSizesFromLocalSource(d,userid){
    return goodiesController.getGoodiesSizes(d,userid);
}
async function getGoodiesSizes(d,userid){
    let response = null;
    try {
        response = await getGoodiesSizesFromLocalSource(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les tailles de goodies'}
    }
    return response;
}

async function getGoodiesColorsFromLocalSource(d,userid){
    return goodiesController.getGoodiesColors(d,userid);
}
async function getGoodiesColors(d,userid){
    let response = null;
    try {
        response = await getGoodiesColorsFromLocalSource(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les couleurs de goodies'}
    }
    return response;
}

async function addColorFromLocalSource(data){
    return goodiesController.addColor(data);
}
async function addColor(data){
    let response = null;
    try {
        response = await addColorFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une couleur'}
    }
    return response;
}

async function addSizeFromLocalSource(data){
    return goodiesController.addSize(data);
}
async function addSize(data){
    let response = null;
    try {
        response = await addSizeFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une taille'}
    }
    return response;
}

async function addGoodieColorFromLocalSource(data){
    return goodiesController.addGoodieColor(data);
}
async function addGoodieColor(data){
    let response = null;
    try {
        response = await addGoodieColorFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une couleur de goodie '}
    }
    return response;
}

async function addGoodieSizeFromLocalSource(data){
    return goodiesController.addGoodieSize(data);
}
async function addGoodieSize(data){
    let response = null;
    try {
        response = await addGoodieSizeFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter une taille de goodies'}
    }
    return response;
}

async function deleteAllColorsFromLocalSource(data){
    return goodiesController.deleteAllColors(data);
}
async function deleteAllColors(data){
    let response = null;
    try {
        response = await deleteAllColorsFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer les couleurs du goodies'}
    }
    return response;
}

async function deleteAllSizesFromLocalSource(data){
    return goodiesController.deleteAllSizes(data);
}
async function deleteAllSizes(data){
    let response = null;
    try {
        response = await deleteAllSizesFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de supprimer les tailles du goodies'}
    }
    return response;
}


async function payOrderFromLocalSource(data){
    return goodiesController.payOrder(data);
}
async function payOrder(data){
    let response = null;
    try {
        response = await payOrderFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de payer la commande'}
    }
    return response;
}

async function addBasketItemsFromLocalSource(data){
    return goodiesController.addBasketItems(data);
}
async function addBasketItems(data){
    let response = null;
    try {
        response = await addBasketItemsFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible d\'ajouter des goodies dans le panier'}
    }
    return response;
}



async function getAllBasketByUserIdFromLocalSource(data){
    return goodiesController.getAllBasketByUserId(data);
}
async function getAllBasketByUserId(data){
    let response = null;
    try {
        response = await getAllBasketByUserIdFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récuperer l\'historique des paniers'}
    }
    return response;
}

async function getAllBasketItemsFromLocalSource(data){
    return goodiesController.getAllBasketItems(data);
}
async function getAllBasketItems(data){
    let response = null;
    try {
        response = await getAllBasketItemsFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récuperer les goodies des paniers'}
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
    getAllBasketItems
}