import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Tickets from "@/views/Tickets.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: Home
        },
        {
            path:'/login',
            name:'LoginPage'
        },


        {
            path: '/ticket',
            name: 'ticketPage',
            component:Tickets
        },


    ],
})

export default router
