import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    // state
    const users = ref([])
    const currentUser = ref(null)

    //getter

    //mutation

    //action
    const getUsers = async () => {

    }

    return {
        //state
        users,
        currentUser,

        //getter

        //mutation

        //action
        getUsers
    }
})
