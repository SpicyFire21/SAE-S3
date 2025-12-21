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



async function getColorsFromLocalSource(){
    return LocalSource.getColors();
}

async function getColors(){
    let response = null;
    try {
        response = await getColorsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les couleurs de goodies'}
    }
    return response;
}


async function getSizesFromLocalSource(){
    return LocalSource.getSizes();
}

async function getSizes(){
    let response = null;
    try {
        response = await getSizesFromLocalSource();
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

async function getGoodiesFromLocalSource(d,userid){
    return LocalSource.getGoodies(d,userid);
}

async function getGoodies(d,userid){
    let response = null;
    try {
        response = await getGoodiesFromLocalSource(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le goodies'}
    }
    return response;
}

async function getGoodiesSizesFromLocalSource(d,userid){
    return LocalSource.getGoodiesSizes(d,userid);
}

async function getGoodiesSizes(d,userid){
    let response = null;
    try {
        response = await getGoodiesSizesFromLocalSource(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le goodies'}
    }
    return response;
}


async function getGoodiesColorsFromLocalSource(d,userid){
    return LocalSource.getGoodiesColors(d,userid);
}

async function getGoodiesColors(d,userid){
    let response = null;
    try {
        response = await getGoodiesColorsFromLocalSource(d,userid);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le goodies'}
    }
    return response;
}


export default {
    getGoodiesByProviderId,
    getColors,
    getSizes,
    addGoodie,
    updateGoodie,
    getGoodies,
    getGoodiesSizes,
    getGoodiesColors

}