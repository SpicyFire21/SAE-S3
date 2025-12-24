import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Tickets from "@/views/Tickets.vue";
import TicketPay from "@/views/TicketPay.vue"
import Connexion from "@/views/Connexion.vue"
import Films from "@/views/Films.vue"
import FilmDetails from "@/views/FilmDetails.vue";
import account from "@/views/Account.vue";
import goodies from "@/views/GoodiesSell.vue"

import providerRoutes from "@/router/provider.router.js"
import adminRoutes from "@/router/admin.router.js";
import StandDetails from "@/views/StandDetails.vue";
import {useUserStore} from "@/stores/index.js";

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
            path: '/stand/:id',
            name: 'StandDetails',
            component: StandDetails,
            props: true
        },
        {
            path: '/goodies',
            name: 'user-goodies',
            component:goodies
        },
        {
            path: '/account',
            name: 'account',
            component:account,
            meta: { requiresAuth: true },

        },

        ...providerRoutes,
        ...adminRoutes
    ],



})

router.beforeEach((to) => {
    const userStore = useUserStore()
    const isLogged = !!userStore.currentUser
    const userRole = userStore.currentUser?.droit

    if (to.meta.requiresAuth && !isLogged) {
        return { name: 'LoginPage' }
    }


    if (to.meta.droit && to.meta.droit !== userRole) {

        if(userRole === "2"){
            return { name: 'admin-dashboard' }
        } else if(userRole === "1"){
            return { name: 'provider-dashboard' }
        } else {
            return { name: 'HomePage' }
        }


    }
})

export default router