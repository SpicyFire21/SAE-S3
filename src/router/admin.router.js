import DashboardView from "@/views/DashboardView.vue";
import ProviderRequests from "@/components/Dashboard/admin/ProviderRequests.vue";
import AdminStats from "@/components/Dashboard/admin/AdminStats.vue";
import StandsRequests from "@/components/Dashboard/admin/StandsRequests.vue";
import AdminVotes from "@/components/Dashboard/admin/AdminVotes.vue";




const router = [
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        meta: { requiresAuth: true, droit: '2' },
        component: DashboardView,
        children:[
            {
                path:'requests',
                name:'requests',
                components: {dashboard:ProviderRequests}
            },
            {
                path:'stats',
                name:'AdminStats',
                components: {dashboard:AdminStats}
            },
            {
                path:'standsRequests',
                name:'standsRequests',
                components: {dashboard:StandsRequests}
            },
            {
                path:'votes',
                name:'AdminVotes',
                components: {dashboard:AdminVotes}
            }

        ]
    }
]

export default router;