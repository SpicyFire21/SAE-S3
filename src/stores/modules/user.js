import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import userService from "@/services/user.service.js"
import {parseJwt} from "@/plugins/jwt.js";


export const useUserStore = defineStore('user', () => {
    // state
    const users = ref([])
    const currentUser = ref(null)
    const providers = ref([])
    const notes = ref([])
    const accessToken = ref(null)


    //getter
    const getUserById = (id) => {
        return users.value.find(u => u.id === id);
    };



    //mutation
    const updateAccessToken = (data) => {
        accessToken.value = data
    }
    const updateCurrentUser = (data) => {
        currentUser.value = data;

        if (data) {
            sessionStorage.setItem('currentUser', JSON.stringify(data));
        } else {
            sessionStorage.removeItem('currentUser');
        }
    };
    const updateNotes = (data) =>{
        notes.value = data;
    }
    const updateUsers = (data) =>{
        users.value = data;
    }
    const updateProviders = (data) => {
        providers.value = data;
    }
    const addUser = (data) =>{
        users.value.push(data)
    }
    const pushNote = (data) => {
        notes.value.push(data)
    }
    const clearSession = () => {
        accessToken.value = null
        currentUser.value = null
    }

    const setSession = (payload) => {
        accessToken.value = payload;
        const tokenPayload = parseJwt(payload);

        currentUser.value = {
            id: tokenPayload.id,
            pseudo: tokenPayload.pseudo,
            email:tokenPayload.email
        };

    };

    //action
    const getUsers = async () => {
        try {
            const response = await userService.getUsers();
            updateUsers(response.data)

        } catch (e) {
            console.error(e)
        }
    }
    const getNotes = async () => {
        try {
            const response = await userService.getNotes();
            updateNotes(response.data)

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
            if (response.error ===0){
                setSession(response.data.accessToken)
                // alert("Connexion réussi")
            } else {
                alert(response.data)

            }
            return response;
        }catch (e) {
            console.error(e)
        }
    }



    const logout = async () => {
        try {
            let result = await userService.logout();
            if (result.error === 0){
                updateCurrentUser(null);

            }
        } catch (error){
            console.error("Erreur lors de la deconnexion", error)
        }
    }


    const registerUser = async (data) =>{
        try{
            const response = await userService.registerUser(data);

            if(response.error ===0){
                addUser(response.data)
                // alert("Compte créé")
            } else {
                console.error(response)
            }

        } catch(e){
            console.error(e)
        }
    }

    const registerProvider = async (data) => {
        try{
            const response = await userService.registerProvider(data);

            if(response.error ===0){
                addUser(response.data)
            } else {
                console.error(response)
            }

        } catch(e){
            console.error(e)

        }
    }

    const addNote = async (data) => {
        try {
            const response = await userService.addNote(data);
            pushNote(response.data)
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const refreshAccessToken = async () => {
        const res = await userService.refreshTokens()

        if (res.error !== 0 || !res.data?.accessToken) {
            clearSession()
            throw new Error('Refresh failed')
        }

        setSession(res.data.accessToken)
        return res.data.accessToken
    }



    //sert a export les fonctions/states du store
    return {
        //state
        providers,
        users,
        currentUser,
        notes,
        accessToken,
        //getter

        //mutation
        updateAccessToken,

        //action
        getProviders,
        getUsers,
        Login,
        registerUser,
        logout,
        registerProvider,
        getUserById,
        getNotes,
        addNote,
        refreshAccessToken
    }
})
