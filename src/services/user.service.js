import userController from "@/datasource/controller/user.controller.js"
import {getRequest, postRequest} from "@/services/axios.service.js";


async function getUserByIdFromLocalSource(id) {
    return userController.getUserById(id);
}
async function getUserFromLocalSource(){
    return userController.getUsers();
}

async function getUserByIdFromAPI(id) {
    return getRequest(`/users/${id}`,"GET-USER-BY-ID");
}
async function getUserFromAPI(){
    return getRequest(`/users`,"GET-USERS");

}

export async function getUserById(id){
    let response = null;
    try {
        // response = await getUserByIdFromLocalSource(id);
        response = await getUserByIdFromAPI(id);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le user'}
    }
    return response;
}

export async function getUsers(){
    let response = null;
    try {
        // response = await getUserFromLocalSource();
        response = await getUserFromAPI();

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les utilisateurs'}
    }
    return response;
}

async function getProvidersFromLocalSource() {
    return userController.getProviders();
}
async function getProvidersFromAPI() {
    return getRequest("/providers","GET-PROVIDERS");
}
export async function getProviders() {
    let response = null;
    try {
        // response = await getProvidersFromLocalSource();
        response = await getProvidersFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les prestataires'}
    }
    return response;
}

async function loginFromLocalSource(data){
    return userController.login(data);
}

async function loginFromAPI(data){
    return postRequest("/users/login",data,"LOGIN");
}
async function login(data){
    let response = null;
    try {
        // response = await loginFromLocalSource(data);
        response = await loginFromAPI(data);
    } catch (err){
        console.log(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de se connecter'}
    }
    return response;
}

async function registerUserFromLocalSource(data){
    return userController.registerUser(data);
}
async function registerUserFromAPI(data){
    return postRequest("/users/register",data,"REGISTER");
}
async function registerUser(data){
    let response = null;
    try {
        // response = await registerUserFromLocalSource(data);
        response = await registerUserFromAPI(data);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de créer un compte'}
    }
    return response;
}

async function registerProviderFromLocalSource(data){
    return userController.registerProvider(data);
}
async function registerProviderFromAPI(data){
    return postRequest("/users/register",data,"REGISTER-PROVIDER");

}
async function registerProvider(data){
    let response = null;
    try {
        // response = await registerProviderFromLocalSource(data);
        response = await registerProviderFromAPI(data);

    } catch (err){
        console.error(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de créer un compte prestataire'}
    }
    return response;
}

async function getNotesFromLocalSource(){
    return userController.getNotes();
}
async function getNotesFromAPI(){
    return getRequest("/notes","GET-NOTES");
}
async function getNotes(){
    let response = null;
    try {
        // response = await getNotesFromLocalSource();
        response = await getNotesFromAPI();
    } catch (err){
        console.error(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les notes'}
    }
    return response;
}

async function addNoteFromLocalSource(data){
    return userController.addNote(data);
}
async function addNoteFromAPI(data){
    return postRequest("/notes",data,"ADD-NOTE");
}
async function addNote(data){
    let response = null;
    try {
        // response = await addNoteFromLocalSource(data);
        response = await addNoteFromAPI(data);
    } catch (err){
        console.error(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de créer une note'}
    }
    return response;
}

export default {
    getUsers,
    login,
    getProviders,
    registerUser,
    registerProvider,
    getUserById,
    getNotes,
    addNote
}