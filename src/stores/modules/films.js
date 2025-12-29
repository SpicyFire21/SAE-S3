import {ref} from 'vue'
import {defineStore} from 'pinia'
import filmsService from "@/services/films.service.js"

export const useFilmsStore = defineStore('films', () => {
    // state
    const films = ref([])
    const projections = ref([])
    const genres = ref([])
    const filmGenres = ref([])
    const filmCast = ref([])
    const selectedProjection = ref(null)

    const updateFilms = (data) =>{
        films.value = data;
    }

    const updateGenres = (data) =>{
        genres.value = data;
    }

    const updateFilmGenres = (data) =>{
        filmGenres.value = data;
    }

    const updateFilmCast = (data) =>{
        filmCast.value = data;
    }

    const updateProjections = (data) => {
        projections.value = data;
    }

    const setSelectedProjection = (projection) => {
        selectedProjection.value = projection
    }

    const getProjections = async () => {
        try {
            const response = await filmsService.getProjections();
            updateProjections(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getFilms = async () => {
        try {
            const response = await filmsService.getFilms();
            updateFilms(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    const getGenres = async () => {
        try {
            const response = await filmsService.getGenres();
            updateGenres(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    const getFilmCast = async () => {
        try {
            const response = await filmsService.getFilmCast();
            updateFilmCast(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    const getFilmGenres = async () => {
        try {
            const response = await filmsService.getFilmGenres();
            updateFilmGenres(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    const getFilmById = async (id) => {
        try {
            const response = await filmsService.getFilmById(id);
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const getGenreById = async (id) => {
        try {
            const response = await filmsService.getGenreById(id);
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    const getFilmsByStand = async (standId) => {
        try {
            const response = await filmsService.getFilms()
            const allFilms = response.data
            const projectionsForStand = projections.value.filter(p => p.standId === standId)
            const filmIds = projectionsForStand.map(p => p.filmId)
            const filmsForStand = allFilms.filter(film => filmIds.includes(film.id))
            updateFilms(filmsForStand)
        } catch (e) {
            console.error(e)
        }
    }


    const getGenresOfFilm = (idFilm) => {
        return filmGenres.value
            .filter(fg => fg.filmId === idFilm)
            .map(fg => {
                const genre = genres.value.find(g => g.id === fg.genreId)
                return genre ? genre.name : null
            })
            .filter(Boolean)
    }

    const getFilmsOfGenre = (idGenre) => {
        const filmIds = filmGenres.value
            .filter(fg => fg.genreId === idGenre)
            .map(fg => fg.filmId)
        return films.value.filter(film => filmIds.includes(film.id))
    }



    const init = async () => {
        await Promise.all([
            getFilms(),
            getGenres(),
            getFilmCast()
        ])
    } // ca évite de mettre 3 lignes a chaque fichiers






    return {
        films,
        getFilms,
        getFilmsByStand,
        getProjections,
        projections,
        selectedProjection,
        setSelectedProjection,
        updateFilms,
        getFilmGenres,
        getFilmCast,
        getGenres,
        getFilmById,
        getGenreById,
        init,
        filmGenres,
        getGenresOfFilm,
        getFilmsOfGenre,
        genres
    }
})
