import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService from "@/services/stands.service.js";

export const useStandsStore = defineStore('store', () => {
    // state
    const stands = ref([])

    const updateStands = (data) =>{
        stands.value = data;
    }

    const getStands = async () => {
        try {
            const response = await standsService.getStands();
            updateStands(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    return {
        stands, getStands
    }
})
