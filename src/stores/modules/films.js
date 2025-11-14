import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";

export const useFilmsStore = defineStore('films', () => {
    // state
    const films = ref([])

    const updateFilms = (data) =>{
        films.value = data;
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

    return {
        films,
        getFilms,
        getFilmDirector
    }
})
