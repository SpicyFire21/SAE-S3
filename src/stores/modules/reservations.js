import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService from "@/services/stands.service.js";
import reservationsService, {
    addFilmReservation, getEventFromReservation,
} from "@/services/reservations.service.js";
import {projections, reservations} from "@/datasource/data.js";

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
            pushFilmReservation(response.data.filmReservation)
            pushReservation(response.data.reservation)
        } catch (e) {
            console.error(e)
        }
    }

    const addAutographReservation = async (data) => {
        try {
            const response = await reservationsService.addAutographReservation(data);
            pushAutographReservation(response.data.autographReservation)
            pushReservation(response.data.reservation)
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
