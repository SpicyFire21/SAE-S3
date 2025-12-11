import LocalSource from "@/services/localsource.service.js";


async function dgetGoodiesByProviderIdFromLocalSource(data){
    return LocalSource.getGoodiesByProviderId(data);
}

async function getGoodiesByProviderId(data){
    let response = null;
    try {
        response = await dgetGoodiesByProviderIdFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les goodies du prestataire'}
    }
    return response;
}



async function getGoodiesColorsFromLocalSource(){
    return LocalSource.getGoodiesColors();
}

async function getGoodiesColors(){
    let response = null;
    try {
        response = await getGoodiesColorsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les couleurs de goodies'}
    }
    return response;
}


async function getGoodiesSizesFromLocalSource(){
    return LocalSource.getGoodiesSizes();
}

async function getGoodiesSizes(){
    let response = null;
    try {
        response = await getGoodiesSizesFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les tailles de goodies'}
    }
    return response;
}


async function addGoodieFromLocalSource(d){
    return LocalSource.addGoodie(d);
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
    return LocalSource.updateGoodie(d,userid);
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

export default {
    getGoodiesByProviderId,
    getGoodiesColors,
    getGoodiesSizes,
    addGoodie,
    updateGoodie
}