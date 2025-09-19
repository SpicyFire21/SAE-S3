import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

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
        },

        {
            path: '/program',
            name: 'programPage'
        },

        {
            path: '/speaker',
            name: 'speakerPage'
        },

        {
            path: '/ticket',
            name: 'ticketPage'},
        {
            path: '/galery',
            name: 'galeryPage'
        },
        {
            path: '/contact',
            name: 'contactPage'
        }
    ],
})

export default router
