import userController from "@/datasource/controller/user.controller.js"

async function getUserFromLocalSource(){
    return userController.getUsers();
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

async function getProvidersFromLocalSource() {
    return userController.getProviders();
}
export async function getProviders() {
    let response = null;
    try {
        response = await getProvidersFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les prestataires'}
    }
    return response;
}

async function loginFromLocalSource(data){
    return userController.login(data);
}
async function login(data){
    let response = null;
    try {
        response = await loginFromLocalSource(data);
    } catch (err){
        console.log(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de se connecter'}
    }
    return response;
}

async function registerUserFromLocalSource(data){
    return userController.registerUser(data);
}
async function registerUser(data){
    let response = null;
    try {
        response = await registerUserFromLocalSource(data);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créer un compte'}
    }
    return response;
}

async function registerProviderFromLocalSource(data){
    return userController.registerProvider(data);
}
async function registerProvider(data){
    let response = null;
    try {
        response = await registerProviderFromLocalSource(data);
    } catch (err){
        console.error(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de créer un compte prestataire'}
    }
    return response;
}


export default {
    getUsers,
    login,
    getProviders,
    registerUser,
    registerProvider
}