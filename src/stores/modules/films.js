import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";

export const useFilmsStore = defineStore('films', () => {
    // state
    const films = ref([])
    const projections = ref([])
    const selectedProjection = ref(null)

    const updateFilms = (data) =>{
        films.value = data;
    }

    const updateProjections = (data) => {
        projections.value = data;
    }

    const setSelectedProjection = (projection) => {
        selectedProjection.value = projection
    }

    const getProjections = async () => {
        try {
            const response = await filmsService.getProjections();
            updateProjections(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getFilms = async () => {
        try {
            const response = await filmsService.getFilms();
            updateFilms(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getFilmDirector = async (director_id) => {
        try {
            const response = await filmsService.getFilmDirector(director_id);
            updateFilms(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getFilmsByStand = async (standId) => {
        try {
            const response = await filmsService.getFilms()

            // vu que c'est un tableau
            const filmsForStand = response.data.filter(film =>
                film.standId.includes(standId)
            )
            updateFilms(filmsForStand)
        } catch (e) {
            console.error(e)
        }
    }






    return {
        films,
        getFilms,
        getFilmDirector,
        getFilmsByStand,
        getProjections,
        projections,
        selectedProjection,
        setSelectedProjection,
        updateFilms
    }
})
