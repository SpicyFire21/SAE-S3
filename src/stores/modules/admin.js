import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import adminService from "@/services/admin.service.js"

export const useAdminStore = defineStore('admin', () => {
    // state
    const providerRequests = ref([])



    //getter

    // mutations
    const updateProviderRequests = (data) =>{
        providerRequests.value = data;
    }
    const addProviderRequests = (data) =>{
        providerRequests.value.push(data);
    }
    const removeProviderRequests = (data) =>{
        providerRequests.value = providerRequests.value.filter(obj => obj.id !== data.id)

    }


    //action
    const getProvidersRequests = async () => {
        try {
            const response = await adminService.getProvidersRequests();

            if (response.error === 0){
                updateProviderRequests(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
    const addProviderRequest = async (data) =>{
        try{
            const response = await adminService.addProviderRequest(data);
            console.log(response)
            if (response.error === 0){
                addProviderRequests(response.data)
                console.log(providerRequests)
            }
        } catch(e){
            console.error(e)

        }
    }







    //sert a export les fonctions/states du store
    return {
        //state
        providerRequests,

        //getter

        //mutation
        removeProviderRequests,
        //action
        getProvidersRequests,
        addProviderRequest

    }
})
