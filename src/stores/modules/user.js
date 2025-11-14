import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import userService from "@/services/user.service.js"

export const useUserStore = defineStore('user', () => {
    // state
    const users = ref([])
    const currentUser = ref(null)

    //getter

    //mutation
    const updateUsers = (data) =>{
        users.value = data;
    }
    const updateCurrentUser = (data) =>{
        currentUser.value = data;
    }


    //action
    const getUsers = async () => {
        try {
            const response = await userService.getUsers();
            updateUsers(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getProviders = async () => {
        try {
            const response = await userService.getProviders();
            updateUsers(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const login = async (data) =>{
        try{
            const response = await userService.login(data);
            updateCurrentUser(response.data)
        }catch (e) {
            console.error(e)
        }
    }




    //sert a export les fonctions/states du store
    return {
        //state
        users,
        currentUser,

        //getter

        //mutation

        //action
        getUsers,
        getProviders,
        login
    }
})
