import {
    autographs,
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


export default {
    getAutographById,
    getAutographs,
    getAutographsByStandId
}
