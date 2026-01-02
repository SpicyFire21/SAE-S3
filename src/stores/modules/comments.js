import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import commentsService from "@/services/comment.service.js";
import filmsService from "@/services/films.service.js";

export const useCommentsStore = defineStore('comments', () => {
    const comments = ref([])

    const updateComments = (data) => {
        comments.value = data;
    }

    const pushComment = (data) => {
        comments.value.push(data)
    }

    const removeComment = (comment) => {
        const index = comments.value.findIndex(c => c.id === comment.id);
        if (index !== -1) {
            comments.value.splice(index, 1);
        } else {
            console.warn("commentaire non trouvé :", comment.id);
        }
    };

    const getComments = async () =>{
        try {
            const response = await commentsService.getComments();
            if (response.error === 0){
                updateComments(response.data)
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }

    const addComment = async(comment) =>{
        try {
            const response = await commentsService.addComment(comment);
            if (response.error === 0){
                pushComment(response.data);
                return response.data;
            } else {
                console.error(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }





    return {
        getComments, addComment, comments
    }
})
