import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import goodiesService from "@/services/goodies.service.js"


export const useGoodiesStore = defineStore('goodies', () => {
    // state
    const basket = ref([]) // contient l'id du panier et celui de l'utilisateur
    const basketItems = ref([]) // contient l'id du panier et les id des items

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
    const setBasket = (data) =>{
        basket.value = data
    }
    const setBasketItems = (data) =>{
        basketItems.value = data
    }
    const pushBasketItems = (data) =>{
        basketItems.value.push(data)
    }

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
    const updateBasket = (data) => {
        basket.value = data
    }


    //action
    const getBasketByUserId = async (id) =>{
        try {
            const response = await goodiesService.getBasketByUserId(id);

            if (response.error === 0){
                setBasket(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const getBasketItems = async (id) =>{
        try {
            const response = await goodiesService.getBasketItems(id);
            if (response.error === 0){
                setBasketItems(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }

    const getGoodies = async () =>{
        try {
            const response = await goodiesService.getGoodies();
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
            const response = await goodiesService.getGoodiesByProviderId(id);
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
            const response = await goodiesService.getColors();

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
            const response = await goodiesService.getSizes();

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
            const response = await goodiesService.getGoodiesSizes();

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
            const response = await goodiesService.getGoodiesColors();

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
            const response = await goodiesService.addColor(data);
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
            const response = await goodiesService.addSize(data);
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
            const response = await goodiesService.addGoodie(data);
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
            const response = await goodiesService.addGoodieColor(data);
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
            const response = await goodiesService.addGoodieSize(data);
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
            const response = await goodiesService.updateGoodie(data,userid);

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
            const response = await goodiesService.deleteAllColors(id);
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
            const response = await goodiesService.deleteAllSizes(id);
            if (response.error === 0){
                updateGoodiesSizes(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const payOrder = async(id) =>{
        try {
            const response = await goodiesService.payOrder(id);
            if (response.error === 0){
                updateBasket(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const addBasketItems = async (data) =>{
        try {
            const response = await goodiesService.addBasketItems(data);
            if (response.error === 0){
                pushBasketItems(response.data)
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
        basket,
        basketItems,
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
        setBasket,
        pushBasketItems,
        updateGoodies,
        removeGoodie,

        //action
        getBasketByUserId,
        getBasketItems,
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
        payOrder,
        addBasketItems


    }
})
