import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import userService from "@/services/user.service.js"

export const useUserStore = defineStore('user', () => {
    // state
    const users = ref([])
    const currentUser = ref(null)
    const providers = ref([])

    //hydratation
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
        currentUser.value = JSON.parse(storedUser);
    }


    //getter

    //mutation
    const updateCurrentUser = (data) => {
        currentUser.value = data;

        if (data) {
            sessionStorage.setItem('currentUser', JSON.stringify(data));
        } else {
            sessionStorage.removeItem('currentUser');
        }
    };



    const updateUsers = (data) =>{
        users.value = data;
    }
    const updateProviders = (data) => {
        providers.value = data;
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
            updateProviders(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const Login = async (data) =>{
        try{
            const response = await userService.login(data);
            updateCurrentUser(response.data)
            // alert("Cnnexion réussi")
        }catch (e) {
            console.error(e)
        }
    }

    const logout = async()=>{
        updateCurrentUser(null)

    }

    const registerUser = async (data) =>{
        try{
            const response = await userService.registerUser(data);
            updateUsers(response.data)

        } catch(e){
            console.error(e)

        }
    }
    const registerProvider = async (data) =>{
        try{
            const response = await userService.registerProvider(data);

        } catch(e){
            console.error(e)

        }
    }




    //sert a export les fonctions/states du store
    return {
        //state
        providers,
        users,
        currentUser,

        //getter

        //mutation

        //action
        getProviders,
        getUsers,
        Login,
        registerUser,
        registerProvider,
        logout
    }
})
