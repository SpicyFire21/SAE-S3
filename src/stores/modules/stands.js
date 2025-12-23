import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService from "@/services/stands.service.js";
import {useUserStore} from "@/stores/index.js";

export const useStandsStore = defineStore('stands', () => {
    // state
    const stands = ref([])
    const standsTypes = ref([])
    const selectedStand = ref(null)

    const enrichedStands = computed(() => { // ici on va utiliser cela pour l'affichage dans le front
        // comme on a pas les données en dur (par exemple le nom, le nom du type etc...) au lieu de faire la liaison dans chaque
        // composant
        const userStore = useUserStore();
        return stands.value.map(stand => {
            const owner = userStore.users.find(u => u.id === stand.owner);
            const type = standsTypes.value.find(t => t.id === stand.type);
            return {
                ...stand,
                ownerName: owner ? owner.name : "Stand sans propriétaire",
                typeName: type ? type.type : "Stand sans type"
            };
        });
    });

    const updateStands = (data) => {
        stands.value = data;
    }

    const setSelectedStand = (stand) => {
        selectedStand.value = stand
    }

    const clearSelectedStand = () => {
        selectedStand.value = null
    }

    const updateStandsTypes = (data) => {
        standsTypes.value = data;
    }

    const getStands = async () => {
        try {
            const response = await standsService.getStands();
            updateStands(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getStandsTypes = async () => {
        try {
            const response = await standsService.getStandsTypes();
            updateStandsTypes(response.data)
        } catch (e) {
            console.error(e)
        }
    }



    return {
        stands, selectedStand, getStands, setSelectedStand,
        clearSelectedStand, getStandsTypes, standsTypes, enrichedStands
    }
})
