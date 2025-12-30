import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService, {getStandById} from "@/services/stands.service.js";
import {useUserStore} from "@/stores/index.js";
import {useFilmsStore} from "@/stores/index.js";
import reservationsService from "@/services/reservations.service.js";
import goodiesService from "@/services/goodies.service.js";

export const useStandsStore = defineStore('stands', () => {
    // state
    const stands = ref([])
    const standsTypes = ref([])
    const selectedStand = ref(null)
    const userStore = useUserStore();
    const filmStore = useFilmsStore();
    const standReservationsRequests = ref([])

    const updateStands = (data) => {
        stands.value = data;
    }

    const setSelectedStand = (stand) => {
        selectedStand.value = stand
    }

    const clearSelectedStand = () => {
        selectedStand.value = null
    }

    const updateStandsTypes = (data) => {
        standsTypes.value = data;
    }

    const updateStandReservationsRequests = (data) => {
        standReservationsRequests.value = data;
    }

    const pushStandReservationsRequests = (data) => {
        standReservationsRequests.value.push(data);
    }


    const getProjectionsByStandAndFilm = (standId, filmId) => {
        return filmStore.projections.filter(
            p => p.standId === standId && p.filmId === filmId
        );
    }

    const init = async () => {
        await Promise.all([
            getStands(),
            getStandsTypes(),
            userStore.getUsers()
        ])
    } // ca évite de mettre 3 lignes a chaque fichiers

    const getStands = async () => {
        try {
            const response = await standsService.getStands();
            updateStands(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getStandsTypes = async () => {
        try {
            const response = await standsService.getStandsTypes();
            updateStandsTypes(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getStandsReservationsRequests = async () => {
        try {
            const response = await standsService.getStandsReservationsRequests();
            updateStandReservationsRequests(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const addStandRequest = async(data) =>{
        try {
            const response = await standsService.addStandRequest(data);
            if (response.error === 0){
                updateStandReservationsRequests(data)
                return response.data
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }

    const getStandById = async (id) => {
        try {
            const response = await standsService.getStandById(id);
            return response.data
        } catch (e) {
            console.error(e)
        }
    }


    const getStandTypeById = async (id) => {
        try {
            const response = await standsService.getStandTypeById(id);
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const getStandTypeByIdForProvider = (typeId) => {
        return standsTypes.value.find(st => st.id === typeId)
    }

    const getStandByIdForAdmin = (id) => {
        return stands.value.find(s => s.idstand === id);
    }



    return {
        stands, selectedStand, getStands, setSelectedStand,
        clearSelectedStand, getStandsTypes, standsTypes, init,
        getProjectionsByStandAndFilm, getStandById, getStandTypeById, getStandsReservationsRequests, addStandRequest, standReservationsRequests,
        getStandByIdForAdmin, getStandTypeByIdForProvider
    }
})
