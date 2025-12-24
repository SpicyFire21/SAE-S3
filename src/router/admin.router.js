import DashboardView from "@/views/DashboardView.vue";
import ProviderRequests from "@/components/Dashboard/admin/ProviderRequests.vue";
import AdminStats from "@/components/Dashboard/admin/AdminStats.vue";


const router = [
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        meta: { requiresAuth: true, droit: '2' },
        component: DashboardView,
        children:[
            {
                path:'requests',
                name:'requets',
                components: {dashboard:ProviderRequests}
            },
            {
                path:'stats',
                name:'AdminStats',
                components: {dashboard:AdminStats}
            }

        ]
    }
]

export default router;