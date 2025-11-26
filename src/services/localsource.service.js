import { users, tickets,films, film_tickets } from '@/datasource/data.js'
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
        session:user.session
    };

    return { error: 0, status: 200, data: u };
}


async function createTicket() {
    const t = {
        idticket: "4c3bfa40-79f0-4f27-9af0-8bc4f606e0c4",
        iduser: "a2b1c8c4-2e53-4c37-a4de-3c4fc35b18fa",
        datefrom: "2023-05-02T00:00:00",
        dateto: "2023-05-02T23:59:59",
        priceid: "93b0592a-922d-4b39-9227-b5f7d84c95ff"
    };


    tickets.push(t)



    return { error: 0, status: 200, data: t };

}


async function getBilletsByUserId(id){
    const billets = tickets.filter(b => b.iduser === id)


    return { error: 0, status: 200, data: billets };
}


export default {
    getUsers,
    login,
    getFilms,
    getFilmTickets,
    getProviders,
    getFilmDirector,
    createTicket,
    getBilletsByUserId
}