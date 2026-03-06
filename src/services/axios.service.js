import axios from 'axios'
import {useUserStore} from "@/stores/index.js";

export const API_URL = "http://localhost:3000";

const axiosAgent = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

const refreshAgent = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

let refreshing = false
let queue = []

axiosAgent.interceptors.request.use(config => {
    const userStore = useUserStore()
    if (userStore.accessToken) {
        config.headers.Authorization = `Bearer ${userStore.accessToken}`
    }
    return config
})

axiosAgent.interceptors.response.use(
    res => res,
    async error => {
        const authStore = useUserStore();
        const original = error.config;

        if (error.response?.status === 401 && !original._retry && authStore.currentUser) {
            original._retry = true

            if (!refreshing) {
                refreshing = true
                try {
                    const newToken = await authStore.refreshAccessToken()

                    queue.forEach(cb => cb(newToken))
                    queue = []
                } catch {
                    queue.forEach(cb => cb(null))
                    queue = []
                    await authStore.logout()
                } finally {
                    refreshing = false
                }
            }

            return new Promise((resolve, reject) => {
                queue.push(token => {

                    if (!token) return reject(error)
                    original.headers.Authorization = `Bearer ${token}`
                    resolve(axiosAgent(original))
                })
            })
        }

        return Promise.reject(error);
    }
);




function handleError(serviceName, err) {
    if (err.response) {
        console.log("ERROR while calling SERVICE " + serviceName + ": " + JSON.stringify(err.response));
        return {
            data: {
                error: 1,
                data: err.response.data
            }
        };
    }
    else if (err.request) {
        console.log("NETWORK ERROR while calling SERVICE "+serviceName+ ": " + JSON.stringify(err.request));
        return {
            data: {
                error: 1,
                data: 'Le serveur est injoignable ou l\'URL demandée n\'existe pas'
            }
        };
    }
    else {
        console.log("UNKNOWN ERROR while calling SERVICE "+serviceName);
        return {
            data: {
                error: 1,
                data: 'Erreur inconnue'
            }
        };
    }
}

async function getRequest(uri, name, config = {}) {
    let response = null
    try {
        response = await axiosAgent.get(uri, config)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

async function postRequest(uri, data, name, config = {}) {
    let response = null
    try {
        response = await axiosAgent.post(uri, data, config)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

async function patchRequest(uri, data, name, config={}) {
    let response = null
    try {

        response = await axiosAgent.patch(uri, data, config)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

async function putRequest(uri, data, name, config = {}) {
    let response = null;
    try {
        response = await axiosAgent.put(uri, data, config);
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

async function deleteRequest(uri, name, config = {}) {
    let response = null;
    try {
        response = await axiosAgent.delete(uri, config);
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

async function refreshTokenPostRequest(uri, data, name, config = {}) {
    let response = null
    try {
        response = await refreshAgent.post(uri, data, config)
    } catch (err) {
        response =  {
            data: {
                error: 0,
                data: err.response.data
            }
        };
    }
    return response.data;
}

export {
    getRequest,
    postRequest,
    patchRequest,
    putRequest,
    deleteRequest,

    refreshTokenPostRequest
}
