import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService from "@/services/stands.service.js";
import reservationsService from "@/services/reservations.service.js";

export const useStandsStore = defineStore('reservations', () => {
    const reservations = ref([])

    const updateReservations = (data) => {
        reservations.value = data;
    }

    const getReservations = async () => {
        try {
            const response = await reservationsService.getReservations();
            updateReservations(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    return {
        reservations
    }
})
