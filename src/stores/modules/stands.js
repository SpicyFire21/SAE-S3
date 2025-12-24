import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"
import {getUsers} from "@/services/user.service.js";
import standsService, {getStandById} from "@/services/stands.service.js";
import {useUserStore} from "@/stores/index.js";
import {useFilmsStore} from "@/stores/index.js";

export const useStandsStore = defineStore('stands', () => {
    // state
    const stands = ref([])
    const standsTypes = ref([])
    const selectedStand = ref(null)
    const userStore = useUserStore();
    const filmStore = useFilmsStore();





    // A ENLEVER DEMAIN
    const enrichedStands = computed(() => { // ici on va utiliser cela pour l'affichage dans le front
        // comme on a pas les données en dur (par exemple le nom, le nom du type etc...) au lieu de faire la liaison dans chaque
        // composant
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

    const getProjectionsByStandAndFilm = (standId, filmId) => {
        return filmStore.projections.filter(
            p => p.standId === standId && p.filmId === filmId
        );
    }

    const getNameStandById = (standId) => {
        const stand = stands.value.find(s => s.idStand === standId);
        return stand ? stand.name : null;
    }







    const init = async () => {
        await Promise.all([
            getStands(),
            getStandsTypes(),
            userStore.getUsers()
        ])
    } // ca évite de mettre 3 lignes a chaque fichiers

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

    const getStandById = async (id) => {
        try {
            const response = await standsService.getStandById(id);
            return response.data
        } catch (e) {
            console.error(e)
        }
    }



    return {
        stands, selectedStand, getStands, setSelectedStand,
        clearSelectedStand, getStandsTypes, standsTypes, enrichedStands, init,
        getProjectionsByStandAndFilm, getNameStandById, getStandById
    }
})
