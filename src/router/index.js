import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Tickets from "@/views/Tickets.vue";
import TicketPay from "@/views/TicketPay.vue"
import Connexion from "@/views/Connexion.vue"

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
            name:'LoginPage',
            component: Connexion
        },


        {
            path: '/ticket',
            name: 'ticketPage',
            component:Tickets
        },
        {
            path:'/ticket/:id',
            name:'ticketPay',
            component:TicketPay
        },


    ],
})

export default router
