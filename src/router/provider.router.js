
import DashboardView from "@/views/DashboardView.vue";
import goodies from "@/components/Dashboard/provider/GoodiesBoard.vue";
import ProviderStats from "@/components/Dashboard/provider/ProviderStats.vue";


const router = [
    {
        path: '/provider-dashboard',
        name: 'provider-dashboard',
        component: DashboardView,
        children:[
            {
                path:'goodies',
                name:'goodies',
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