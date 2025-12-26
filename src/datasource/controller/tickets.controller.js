import {film_tickets, tickets, tickets_price} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'

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
async function getTicketsPrice(){
    return { error: 0, status: 200, data: tickets_price };
}
async function getBilletsByUserId(id){
    const billets = tickets.filter(b => b.iduser === id)


    return { error: 0, status: 200, data: billets };
}

async function getFilmTickets() {
    return {error:0, status:200, data:film_tickets}
}

export default {
    getFilmTickets,

    createTicket,
    getBilletsByUserId,
    getTicketsPrice
}