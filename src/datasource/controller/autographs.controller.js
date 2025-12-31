import {
    autographs, projections,
} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'

async function getAutographs() {
    return {error:0, status:200, data:autographs}
}

async function getAutographById(id) {
    const autograph = autographs.find(a => a.id === id)
    return { error: 0, status:200, data: autograph}
}

async function getAutographsByStandId(id) {
    const autograph = autographs.filter(a => a.standId === id);
    return { error: 0, status:200, data: autograph}
}

export async function deleteAutograph(autograph) {
    const index = autographs.findIndex(p => p.id === autograph.id);

    if (index === -1) {
        return { error: 1, status: 404, data: "Autograph inexistante" };
    }

    const removed = autographs.splice(index, 1)[0]; // on supprime et on recupere l'objet (le [0] sert a renvoyé l'objet supprimé)
    return { error: 0, status: 200, data: removed };
}


export default {
    getAutographById,
    getAutographs,
    getAutographsByStandId,
    deleteAutograph
}
