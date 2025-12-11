import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import providerService from "@/services/provider.service.js"

export const useProviderStore = defineStore('provider', () => {
    // state
    const goodies = ref([])
    const goodiesColors = ref([])
    const goodiesSizes = ref([])
    //getter
    const getColor = (id) => {
        return goodiesColors.value.find(c => c.id === id)
    }
    const getSize = (id) => {
        return goodiesSizes.value.find(c => c.id === id)
    }
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

    const addGoodies = (data) =>{
        goodies.value.push(data);
    }

    const removeGoodie = (data) => {
        goodies.value = goodies.value.filter(obj => obj.id !== data.id)
    }
    const editGoodies = (updatedGoodie) => {
        const index = goodies.value.findIndex(g => g.id === updatedGoodie.id)
        if (index !== -1) {
            // remplace l'ancien goodie par le nouveau
            goodies.value.splice(index, 1, updatedGoodie)
        } else {
            console.warn("Goodie non trouvé :", updatedGoodie.id)
        }
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

    const addGoodie = async(data) =>{
        try {
            const response = await providerService.addGoodie(data);

            if (response.error === 0){
                addGoodies(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }

    const updateGoodie = async(data,userid) =>{
        try {
            const response = await providerService.updateGoodie(data,userid);

            if (response.error === 0){
                editGoodies(response.data)
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
        getSize,
        getColor,
        //mutation
        updateGoodies,
        removeGoodie,

        //action
        getGoodiesByProviderId,
        getGoodiesSizes,
        getGoodiesColors,
        addGoodie,
        updateGoodie

    }
})
