import {provider_requests, users} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'

async function getProvidersRequests(){
    return {error:0,status:200,data:provider_requests}
}
async function addProviderRequest(data){
    if (!data.login){
        return { error: 1, status: 404, data: 'login manquant' };
    }
    if (!data.password){
        return { error: 1, status: 404, data: 'password manquant' };
    }
    if (!data.email){
        return { error: 1, status: 404, data: 'email manquant' };
    }
    if (!data.email2){
        return { error: 1, status: 404, data: 'confirmez votre email' };
    }

    if (data.email !== data.email2){
        return { error: 1, status: 404, data: 'email différents' };
    }
    const emailExist = users.find(u => u.email === data.email);

    if(emailExist){
        return {error:1,status:403,data:"email dejà utilisé"}
    }

    const r = {
        id:uuidv4(),
        name:data.name,
        login:data.login,
        password:data.password,
        email:data.email,
        email2:data.email2,
        droit:"1",
        session:"",
        note: [],
        type:"",
        nom_photo:"",
        description:"",
        date:new Date().toISOString()
    }
    provider_requests.push(r);



    return { error: 0, status: 201, data: r };

}
async function deleteProviderRequests(data) {
    if (!data.id) {
        return { error: 1, status: 404, data: 'id manquant' };
    }

    const index = provider_requests.findIndex(obj => obj.id === data.id);

    if (index !== -1) {
        provider_requests.splice(index, 1);
        return { error: 0, status: 200, data: data };
    }

    return { error: 1, status: 404, data: 'demande introuvable' };
}

export default {
    getProvidersRequests,
    addProviderRequest,
    deleteProviderRequests,

}