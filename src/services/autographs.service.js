import autographController from "@/datasource/controller/autographs.controller.js"
import filmsController from "@/datasource/controller/films.controller.js";
import {getRequest} from "@/services/axios.service.js";

async function getAutographsFromLocalSource() {
    return autographController.getAutographs()
}

async function getAutographByIdFromLocalSource(id) {
    return autographController.getAutographById(id)
}

async function getAutographByStandIdFromLocalSource(id) {
    return autographController.getAutographsByStandId(id)
}



async function getAutographsFromAPI() {
    return getRequest("/autographs","GET-AUTOGRAPHS");
}

async function getAutographByIdFromAPI(id) {
    return getRequest(`/autographs/${id}`,"GET-AUTOGRAPHS-BY-ID");
}

async function getAutographByStandIdFromAPI(id) {
    return getRequest(`/autographs/stand/${id}`,"GET-AUTOGRAPHS-BY-STAND-ID");
}



export async function getAutographsByStandId(id){
    let response = null;
    try {
        // response = await getAutographByStandIdFromLocalSource(id);
        response = await getAutographByStandIdFromAPI(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer les autographs depuis ce stand'}
    }
    return response;
}



export async function getAutographs(){
    let response = null;
    try {
        // response = await getAutographsFromLocalSource();
        response = await getAutographsFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les autographs'}
    }
    return response;
}

export async function getAutographById(id){
    let response = null;
    try {
        // response = await getAutographByIdFromLocalSource(id);
        response = await getAutographByIdFromAPI(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer cette autograph'}
    }
    return response;
}





async function addAutographFromLocalSource(autograph) {
    return autographController.addAutograph(autograph)
}
async function deleteAutographFromLocalSource(autograph) {
    return autographController.deleteAutograph(autograph);
}
async function updateAutographFromLocalSource(autograph) {
    return autographController.updateAutograph(autograph)
}


async function addAutographFromAPI(autograph) {
    return "route manquante dans l'api"
}
async function deleteAutographFromAPI(autograph) {
    return  "route manquante dans l'api"
}
async function updateAutographFromAPI(autograph) {
    return  "route manquante dans l'api"
}



export async function addAutograph(autograph) {
    let response = null;
    try {
        // response = await addAutographFromLocalSource(autograph);
        response = await addAutographFromAPI(autograph);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter lautograph'}
    }
    return response;
}


export async function updateAutograph(autograph) {
    let response = null;
    try {
        // response = await updateAutographFromLocalSource(autograph);
        response = await updateAutographFromAPI(autograph);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter lautograph'}
    }
    return response;
}


export async function deleteAutograph(projection){
    let response = null;
    try {
        // response = await deleteAutographFromLocalSource(projection);
        response = await deleteAutographFromAPI(projection);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de delete cette autograph'}
    }
    return response;
}

export default {
    getAutographs,
    getAutographById,
    getAutographsByStandId,
    deleteAutograph,
    updateAutograph,
    addAutograph
}