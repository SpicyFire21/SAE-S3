import commentsController from "@/datasource/controller/comments.controller.js";

async function getCommentsFromLocalSource() {
    return commentsController.getComments();
}

export async function getComments(){
    let response = null;
    try {
        response = await getCommentsFromLocalSource();
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible de récupérer les commentaires'}
    }
    return response;
}

async function addCommentFromLocalSource(comment) {
    return commentsController.addComment(comment);
}

export async function addComment(comment){
    let response = null;
    try {
        response = await addCommentFromLocalSource(comment);
    } catch (err){
        response = {error:1, status:404,data:'erreur réseau, impossible dajouter un commentaire'}
    }
    return response;
}

export default {
    getComments, addComment
}