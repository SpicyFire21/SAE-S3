import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import goodiesService from "@/services/goodies.service.js"

export const useGoodiesStore = defineStore('goodies', () => {
    // state
    const basket = ref([]) // contient l'id du panier et celui de l'utilisateur
    const basketItems = ref([]) // contient l'id du panier et les id des items

    //getter


    // mutations
    const setBasket = (data) =>{
        basket.value = data


    }
    const setBasketItems = (data) =>{
        basketItems.value = data
        console.log(basketItems.value)
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
            console.log(response)
            if (response.error === 0){
                setBasketItems(response.data)
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

        //getter


        //mutation
        setBasket,

        //action
        getBasketByUserId,
        getBasketItems

    }
})
