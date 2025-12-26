import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import autographsService from "@/services/autographs.service.js";

export const useAutographsStore = defineStore('autographs', () => {
    const autographs = ref([])
    const selectedAutograph = ref([])

    const updateAutographs = (data) => {
        autographs.value = data;
    }

    const updateSelectedAutograph = (data) => {
        selectedAutograph.value = data;
    }

    const pushAutographs = (data) => {
        autographs.value.push(data)
    }


    const getAutographsByStandId = async (id) => {
        try {
            const response = await autographsService.getAutographsByStandId(id)
            updateAutographs(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getAutographById = async (id) => {
        try {
            const response = await autographsService.getAutographById(id)
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const getAutograph = async () => {
        try {
            const response = await autographsService.getAutographs()
            updateAutographs(response.data)
        } catch (e) {
            console.error(e)
        }
    }



    return {
        getAutograph, getAutographById, getAutographsByStandId, autographs, selectedAutograph
    }
})
