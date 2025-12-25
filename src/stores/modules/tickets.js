import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import ticketService from "@/services/tickets.service.js"

export const useTicketsStore = defineStore('tickets', () => {
    // state
    const tickets = ref([])
    const billets = ref([])//billet pour l'entré de l'event
    const ticketsPrice = ref([])

    const updateTickets = (data) =>{
        tickets.value = data;
    }
    const updateTicketsPrice = (data) =>{
        ticketsPrice.value = data;
    }
    const updateBillets = (data) =>{
        billets.value = data;
    }

    const addBillets = (data) =>{
        billets.value.push(data)
    }

    const getTickets = async () => {
        try {
            const response = await ticketService.getFilmTickets();
            updateTickets(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getTicketsPrice = async () => {
        try {
            const response = await ticketService.getTicketsPrice();
            updateTicketsPrice(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getBilletsByUserId = async (id) => {
        try {
            const response = await ticketService.getBilletsByUserId(id);
            updateBillets(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const createTicket = async (data) =>{
        try {
            const response = await ticketService.createTicket(data)
            if(response.error === 0){
                addBillets(response.data);
                return response.data;
            }
            return response;
        } catch (e) {
            console.error(e)
        }
    }


    return {
        tickets,billets,
        ticketsPrice,
        getTickets,
            createTicket,
        getBilletsByUserId,
        getTicketsPrice
    }
})
