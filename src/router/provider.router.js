import DashboardView from "@/views/DashboardView.vue";
import goodies from "@/components/Dashboard/provider/GoodiesBoard.vue";
import ProviderStats from "@/components/Dashboard/provider/ProviderStats.vue";
import stands from "@/components/Dashboard/provider/ProviderStands.vue"


const router = [
    {
        path: '/provider-dashboard',
        name: 'provider-dashboard',
        meta: { requiresAuth: true, droit: '1' },
        component: DashboardView,
        children:[
            {
                path:'stands',
                name:'provider-stands',
                components: {dashboard:stands}
            },
            {
                path:'goodies',
                name:'provider-goodies',
                components: {dashboard:goodies}
            },
            {
                path:'stats',
                name:'providerStats',
                components: {dashboard:ProviderStats}
            }
        ]
    }
]

export default router;