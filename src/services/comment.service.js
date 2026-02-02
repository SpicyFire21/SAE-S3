import commentsController from "@/datasource/controller/comments.controller.js";
import {getRequest, postRequest} from "@/services/axios.service.js";

async function getCommentsFromLocalSource() {
    return commentsController.getComments();
}

async function addCommentFromLocalSource(comment) {
    return commentsController.addComment(comment);
}

async function getCommentsFromAPI() {
    return getRequest("/comments","GET-COMMENTS")
}



async function addCommentFromAPI(comment) {
    return postRequest("/comments",comment,"ADD-COMMENT")
}



export async function getComments(){
    let response = null;
    try {
        // response = await getCommentsFromLocalSource();
        response = await getCommentsFromAPI();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les commentaires'}
    }
    return response;
}

export async function addComment(comment){
    let response = null;
    try {
        // response = await addCommentFromLocalSource(comment);
        response = await addCommentFromAPI(comment);

    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter un commentaire'}
    }
    return response;
}

export default {
    getComments, addComment
}