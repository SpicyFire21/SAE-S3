import {
    users,
    tickets,
    films,
    film_tickets,
    provider_requests,
    goodies,
    goodies_color,
    goodies_size
} from '@/datasource/data.js'
import {v4 as uuidv4} from 'uuid'



async function getUsers() {
    return {error:0,status:200,data:users}
}

async function getTickets() {
    return {error:0, status:200, data:film_tickets}
}

async function getFilms() {
    return {error:0, status:200, data:films}
}

async function getFilmTickets() {
    return {error:0, status:200, data:film_tickets}
}

async function getProviders() {
    const providers = users.filter(user => Number(user.droit) === 1)
    return { error: 0, status: 200, data: providers }
}

async function getFilmDirector(director_id) {
    const director = users.find(user => user.id === director_id)
    return { error: 0, status: 200, data: director }
}

async function login(data){
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


async function createTicket(data) {
    if (!data.iduser){
        return { error: 1, status: 404, data: "iduser manquant" };

    }
    if (!data.from){
        return { error: 1, status: 404, data: "date de début manquant" };
    }
    if (!data.to){
        return { error: 1, status: 404, data: "date de fin manquant" };
    }
    if (!data.priceid){
        return { error: 1, status: 404, data: "idprice manquant" };
    }

    const t = {
        idticket: uuidv4(),
        iduser: data.iduser,
        datefrom: data.from,
        dateto: data.to,
        priceid: data.priceid
    };

    tickets.push(t);

    return { error: 0, status: 201, data: t };

}


async function getBilletsByUserId(id){
    const billets = tickets.filter(b => b.iduser === id)


    return { error: 0, status: 200, data: billets };
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

    console.log("users",users)


    return { error: 0, status: 201, data: r };


}

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
        description:""
    }
    provider_requests.push(r);

    console.log(provider_requests)


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

    console.log("users",users)

    if (data.droit === "1"){
        const index = provider_requests.findIndex(obj => obj.id === data.id)
        if (index !== -1) {
            provider_requests.splice(index, 1)
        }
    }

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


async function getGoodiesByProviderId(id){

    if (!id) {
        return { error: 1, status: 404, data: 'id manquant' };
    }
    let g = goodies.filter(g => g.user_id === id)
    return { error: 0, status: 200, data: g };


}


async function getGoodiesColors(){
    return { error: 0, status: 200, data: goodies_color };
}

async function getGoodiesSizes(){
    return { error: 0, status: 200, data: goodies_size };
}

async function addGoodie(data){
    if (!data.user_id) {
        return { error: 1, status: 404, data: 'user_id manquant' };
    }
    if (!data.goodies_size_id) {
        return { error: 1, status: 404, data: 'goodies_size_id manquant' };
    }
    if (!data.goodies_color_id) {
        return { error: 1, status: 404, data: 'goodies_color_id manquant' };
    }
    if (!data.name) {
        return { error: 1, status: 404, data: 'name manquant' };
    }
    if (!data.price) {
        return { error: 1, status: 404, data: 'price manquant' };
    }
    if (!data.quantity) {
        return { error: 1, status: 404, data: 'quantity manquant' };
    }




    const g = {
        id: uuidv4(),
        user_id: data.user_id,
        service_id: "1",
        goodies_size_id:data.goodies_size_id,
        goodies_color_id:data.goodies_color_id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        date:new Date().toISOString().split("T")[0]
    }
    return { error: 0, status: 201, data: g };


}



export default {
    getUsers,
    login,
    getFilms,
    getFilmTickets,
    getProviders,
    getFilmDirector,
    createTicket,
    getBilletsByUserId,
    registerUser,
    getProvidersRequests,
    addProviderRequest,
    registerProvider,
    deleteProviderRequests,
    getGoodiesByProviderId,
    getGoodiesColors,
    getGoodiesSizes,
    addGoodie
}