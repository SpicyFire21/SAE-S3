import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService, {getStandById} from "@/services/stands.service.js";
import {useUserStore} from "@/stores/index.js";
import {useFilmsStore} from "@/stores/index.js";

export const useStandsStore = defineStore('stands', () => {
    // state
    const stands = ref([])
    const standsTypes = ref([])
    const selectedStand = ref(null)
    const userStore = useUserStore();
    const filmStore = useFilmsStore();






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



    return {
        stands, selectedStand, getStands, setSelectedStand,
        clearSelectedStand, getStandsTypes, standsTypes, init,
        getProjectionsByStandAndFilm, getStandById, getStandTypeById
    }
})
