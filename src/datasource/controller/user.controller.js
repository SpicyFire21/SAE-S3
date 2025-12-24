import {film_tickets, provider_requests, users} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'
async function getUsers() {
    return {error:0,status:200,data:users}
}

async function getTickets() {
    return {error:0, status:200, data:film_tickets}
}

async function getProviders() {
    const providers = users.filter(user => Number(user.droit) === 1)
    return { error: 0, status: 200, data: providers }
}


async function login(data){
    console.log(data)
    if ((!data.login) || (!data.password))
        return { error: 1, status: 404, data: 'login et/ou mot de passe manquant' };

    const user = users.find(u => u.login === data.login);
    if (!user)
        return { error: 1, status: 404, data: 'login/pass incorrect' };

    const passwordOk = users.find(u => u.password === data.password);
    if (!passwordOk)
        return { error: 1, status: 401, data: 'login/pass incorrect' };

    if (!user.session) {
        user.session = uuidv4();
    }

    const u = {
        id:user.id,
        name:user.name,
        login:user.login,
        password:user.password,
        email:user.email,
        droit:user.droit,
        session:user.session,
        nom_photo:user.nom_photo
    };

    return { error: 0, status: 200, data: u };
}

async function registerUser(data){
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
        droit:data.droit,
        session:"",
        note: [],
        type:"",
        nom_photo:"",
        description:""
    }
    users.push(r); // Ajouter l'utilisateur à la base



    return { error: 0, status: 201, data: r };


}

async function registerProvider(data){
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
        droit:data.droit,
        session:"",
        note: [],
        type:"",
        nom_photo:"",
        description:""
    }
    users.push(r); // Ajouter l'utilisateur à la base


    if (data.droit === "1"){
        const index = provider_requests.findIndex(obj => obj.id === data.id)
        if (index !== -1) {
            provider_requests.splice(index, 1)
        }
    }

    return { error: 0, status: 201, data: r };


}



export default {
    getUsers,
    login,
    getProviders,
    registerUser,
    registerProvider,
}