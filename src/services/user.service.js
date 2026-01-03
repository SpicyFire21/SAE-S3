import userController from "@/datasource/controller/user.controller.js"


async function getUserByIdFromLocalSource(id) {
    return userController.getUserById(id);
}
async function getUserFromLocalSource(){
    return userController.getUsers();
}

export async function getUserById(id){
    let response = null;
    try {
        response = await getUserByIdFromLocalSource(id);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer le user'}
    }
    return response;
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

async function getNotesFromLocalSource(){
    return userController.getNotes();
}
async function getNotes(){
    let response = null;
    try {
        response = await getNotesFromLocalSource();
    } catch (err){
        console.error(err)
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les notes'}
    }
    return response;
}

async function addNoteFromLocalSource(data){
    return userController.addNote(data);
}
async function addNote(data){
    let response = null;
    try {
        response = await addNoteFromLocalSource(data);
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
    getNotes, addNote
}