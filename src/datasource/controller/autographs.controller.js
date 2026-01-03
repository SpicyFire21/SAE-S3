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
    return { error: 0, status: 200, data: autograph };
}

async function updateAutograph(autograph) {
    return { error: 0, status: 200, data: autograph };
}

async function addAutograph(data) {
    const autograph = {
        id: uuidv4(),
        standId: data.standId,
        userId: data.userId,
        beginDate: data.beginDate,
        duration: data.duration
    }

    return {error: 0, status: 201, data: autograph}
}

//         "id": "1",
//         "standId": "4",
//         "userId": "a81699b9-94d1-4f72-9df4-1588dc1b2cc5",
//         "beginDate": "2025-12-23T18:00:00",
//         "duration": "120"


export default {
    getAutographById,
    getAutographs,
    getAutographsByStandId,
    deleteAutograph, updateAutograph, addAutograph
}
