import autographController from "@/datasource/controller/autographs.controller.js"

async function getAutographsFromLocalSource() {
    return autographController.getAutographs()
}

async function getAutographByIdFromLocalSource(id) {
    return autographController.getAutographById(id)
}

async function getAutographByStandIdFromLocalSource(id) {
    return autographController.getAutographsByStandId(id)
}

export async function getAutographsByStandId(id){
    let response = null;
    try {
        response = await getAutographByStandIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer les autographs depuis ce stand'}
    }
    return response;
}


export async function getAutographs(){
    let response = null;
    try {
        response = await getAutographsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les autographs'}
    }
    return response;
}

export async function getAutographById(id){
    let response = null;
    try {
        response = await getAutographByIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de recuperer cette autograph'}
    }
    return response;
}



export default {
    getAutographs, getAutographById, getAutographsByStandId
}