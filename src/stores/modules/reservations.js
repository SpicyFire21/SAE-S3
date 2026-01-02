import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService from "@/services/stands.service.js";
import reservationsService, {
    addFilmReservation, getEventFromReservation,
} from "@/services/reservations.service.js";

export const useReservationsStore = defineStore('reservations', () => {
    const reservations = ref([])
    const filmsReservations = ref([])
    const autographsReservations = ref([])

    const updateReservations = (data) => {
        reservations.value = data;
    }

    const updateFilmsReservations = (data) => {
        filmsReservations.value = data;
    }

    const updateAutographsReservations = (data) => {
        autographsReservations.value = data;
    }

    const pushFilmReservation = (data) =>{
        filmsReservations.value.push(data)
    }

    const pushReservation = (data) => {
        reservations.value.push(data)
    }

    const pushAutographReservation = (data) => {
        autographsReservations.value.push(data);
    }




    const getReservationByIdUser = async (id) => {
        try {
            const response = await reservationsService.getReservationByIdUser(id)
            updateReservations(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getEventFromReservation = async (reservation) => {
        try {
            const response = await reservationsService.getEventFromReservation(reservation)
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const addFilmReservation = async (data) => {
        try {
            const response = await reservationsService.addFilmReservation(data);
            updateFilmsReservations(response.data.filmReservation)
            updateReservations(response.data.reservation) // des updates au lieu de push car sinon ca rajoute 2 fois, AUCUNE IDEE comment fix
            // j'ai essayé une variante pour les projections par exemple ou j'ai push dans le front pensant que peut-être la variable du state
            // pointe sur la même mémoire que le tableau js (ca me parait plutot logique sinon je comprend pas pourquoi ca marche...)
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const addAutographReservation = async (data) => {
        try {
            const response = await reservationsService.addAutographReservation(data);
            updateAutographsReservations(response.data.autographReservation)
            updateReservations(response.data.reservation)
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const getReservations = async () => {
        try {
            const response = await reservationsService.getReservations();
            updateReservations(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getFilmsReservations = async () => {
        try {
            const response = await reservationsService.getFilmsReservations();
            updateFilmsReservations(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getAutographsReservations = async () => {
        try {
            const response = await reservationsService.getAutographsReservations();
            updateAutographsReservations(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    return {
        reservations,
        filmsReservations,
        autographsReservations,
        getReservations,
        getAutographsReservations,
        getFilmsReservations,
        addFilmReservation,
        getReservationByIdUser, getEventFromReservation, addAutographReservation
    }
})
