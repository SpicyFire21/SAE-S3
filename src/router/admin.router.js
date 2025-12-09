
import DashboardView from "@/views/DashboardView.vue";
import ProviderRequests from "@/components/Dashboard/admin/ProviderRequests.vue";


const router = [
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        component: DashboardView,
        children:[
            {
                path:'requests',
                name:'requets',
                components: {dashboard:ProviderRequests}
            }
        ]
    }
]

export default router;