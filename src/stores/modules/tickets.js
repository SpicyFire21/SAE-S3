import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import ticketService from "@/services/tickets.service.js"

export const useTicketsStore = defineStore('tickets', () => {
    // state
    const tickets = ref([])

    const updateTickets = (data) =>{
        tickets.value = data;
    }

    const getTickets = async () => {
        try {
            const response = await ticketService.getFilmTickets();
            updateTickets(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    return {
        tickets,
        getTickets,
    }
})
