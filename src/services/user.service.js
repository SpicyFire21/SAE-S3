import LocalSource from "@/services/localsource.service.js";

async function getUserFromLocalSource(){
    return LocalSource.getUsers();
}

export async function getUsers(){
    let response = null;
    try {
        response = await getUserFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les utilisateurs'}
    }
    return response;
}

async function loginFromLocalSource(data){
    return LocalSource.login(data);
}

async function login(data){
    let response = null;
    try {
        response = await loginFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de se connecter'}
    }
    return response;
}


export default {
    getUsers,
    login
}