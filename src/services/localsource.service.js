import { users, films, film_tickets } from '@/datasource/data.js'
import {v4 as uuidv4} from 'uuid'


async function getUsers() {
    return {error:0,status:200,data:users}
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

export default {
    getUsers,
    login,
    getFilms,
    getFilmTickets,
    getProviders,
    getFilmDirector
}