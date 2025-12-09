import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Tickets from "@/views/Tickets.vue";
import TicketPay from "@/views/TicketPay.vue"
import Connexion from "@/views/Connexion.vue"
import Films from "@/views/Films.vue"
import FilmDetails from "@/views/FilmDetails.vue";
import account from "@/views/Account.vue";

import providerRoutes from "@/router/provider.router.js"
import adminRoutes from "@/router/admin.router.js";

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
            name: 'TicketPage',
            component:Tickets
        },
        {
            path:'/ticket/:id',
            name:'TicketPay',
            component:TicketPay
        },
        {
            path: '/films',
            name: 'FilmsPage',
            component:Films
        },
        {
            path: '/film/:id',
            name: 'FilmDetails',
            component: FilmDetails,
            props: true
        },
        {
            path: '/account',
            name: 'account',
            component:account
        },
        ...providerRoutes,
        ...adminRoutes
    ],



})

export default router
