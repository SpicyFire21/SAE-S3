import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import providerService from "@/services/provider.service.js"

export const useProviderStore = defineStore('provider', () => {
    // state
    const goodies = ref([])
    const colors = ref([])
    const sizes = ref([])
    const goodiesColors = ref([])
    const goodiesSizes = ref([])

    //getter
    const getName = (id) => {

        return goodies.value.find(c => c.id === id).name
    }
    const getPrice = (id) => {

        return goodies.value.find(c => c.id === id).price
    }
    const getColor = (id) => {

        return colors.value.find(c => c.id === id).label
    }
    const getSize = (id) => {
        return sizes.value.find(c => c.id === id).label
    }

    const getSizesByGoodieId = (idgoodie) => {
        const sizeIds = goodiesSizes.value
            .filter(gs => gs.idgoodie === idgoodie)
            .map(gs => gs.idsize)

        return sizes.value.filter(s => sizeIds.includes(s.id))
    }
    const getColorsByGoodieId = (idgoodie) => {
        const colorIds = goodiesColors.value
            .filter(gc => gc.idgoodie === idgoodie)
            .map(gc => gc.idcolor)

        return colors.value.filter(c => colorIds.includes(c.id))
    }
    const goodiesWithOptions = computed(() => {
        return goodies.value.map(g => ({
            ...g,
            sizes: getSizesByGoodieId(g.id),
            colors: getColorsByGoodieId(g.id)
        }))
    })



    // mutations
    const updateGoodies = (data) =>{
        goodies.value = data

    }
    const addGoodiesColors = (data) =>{
        goodiesColors.value.push(data)
    }
    const addGoodiesSizes = (data) =>{
        goodiesSizes.value.push(data)
    }
    const updateColors = (data) =>{
        colors.value = data;
    }
    const updateSizes = (data) =>{
        sizes.value = data;
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
    const pushSize = (data) =>{
        sizes.value.push(data);
    }
    const pushColor = (data) =>{
        colors.value.push(data);
    }
    const removeGoodie = (data) => {
        goodies.value = goodies.value.filter(obj => obj.id !== data.id)
    }
    const editGoodies = (updatedGoodie) => {
        const index = goodies.value.findIndex(g => g.id === updatedGoodie.id)
        if (index !== -1) {
            goodies.value.splice(index, 1, updatedGoodie)
        } else {
            console.warn("Goodie non trouvé :", updatedGoodie.id)
        }
    }


    //action
    const getGoodies = async () =>{
        try {
            const response = await providerService.getGoodies();
            if (response.error === 0){
                updateGoodies(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
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
    const getColors = async () => {
        try {
            const response = await providerService.getColors();

            if (response.error === 0){
                updateColors(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const getSizes = async () => {
        try {
            const response = await providerService.getSizes();

            if (response.error === 0){
                updateSizes(response.data)
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
    const getGoodiesColors = async () =>{
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

    const addColor = async (data) =>{
        try {
            const response = await providerService.addColor(data);
            if (response.error === 0){
                pushColor(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const addSize = async (data) =>{
        try {
            const response = await providerService.addSize(data);
            if (response.error === 0){
                pushSize(response.data)
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
                return response.data
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const addGoodieColor = async(data) =>{
        try {
            const response = await providerService.addGoodieColor(data);
            if (response.error === 0){
                addGoodiesColors(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const addGoodieSize = async(data) =>{
        try {
            const response = await providerService.addGoodieSize(data);
            if (response.error === 0){
                addGoodiesSizes(response.data)

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

    const deleteAllColors = async(id) =>{
        try {
            const response = await providerService.deleteAllColors(id);
            if (response.error === 0){
                updateGoodiesColors(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const deleteAllSizes = async(id) =>{
        try {
            const response = await providerService.deleteAllSizes(id);
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
        colors,
        sizes,
        goodiesColors,
        goodiesSizes,
        //getter
        getSize,
        getColor,
        getName,
        getPrice,
        getSizesByGoodieId,
        getColorsByGoodieId,
        goodiesWithOptions,

        //mutation
        updateGoodies,
        removeGoodie,

        //action
        getGoodiesByProviderId,
        getGoodiesSizes,
        getSizes,
        getColors,
        getGoodiesColors,
        addGoodie,
        updateGoodie,
        getGoodies,
        addColor,
        addSize,
        addGoodieSize,
        addGoodieColor,
        deleteAllColors,
        deleteAllSizes,


    }
})
