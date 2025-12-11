import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import providerService from "@/services/provider.service.js"

export const useProviderStore = defineStore('provider', () => {
    // state
    const goodies = ref([])
    const goodiesColors = ref([])
    const goodiesSizes = ref([])
    //getter

    // mutations
    const updateGoodies = (data) =>{
        goodies.value = data

    }

    const updateGoodiesColors = (data) =>{
        goodiesColors.value = data;
    }

    const updateGoodiesSizes = (data) =>{
        goodiesSizes.value = data;
    }


    //action
    const getGoodiesByProviderId = async (id) => {
        try {
            const response = await providerService.getGoodiesByProviderId(id);

            if (response.error === 0){
                updateGoodies(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }

    const getGoodiesColors = async () => {
        try {
            const response = await providerService.getGoodiesColors();

            if (response.error === 0){
                updateGoodiesColors(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const getGoodiesSizes = async () => {
        try {
            const response = await providerService.getGoodiesSizes();

            if (response.error === 0){
                updateGoodiesSizes(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }




    //sert a export les fonctions/states du store
    return {
        //state
        goodies,
        goodiesColors,
        goodiesSizes,
        //getter

        //mutation
        updateGoodies,

        //action
        getGoodiesByProviderId,
        getGoodiesSizes,
        getGoodiesColors

    }
})
