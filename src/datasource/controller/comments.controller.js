import {
    comments,
} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'

async function getComments() {
    return {error:0, status:200, data:comments}
}

// export async function deleteAutograph(autograph) {
//     return { error: 0, status: 200, data: autograph };
// }

async function addComment(data) {
    const comment = {
        id: uuidv4(),
        userId: data.userId,
        content: data.content,
        date: data.date
    }

    return {error: 0, status: 201, data: comment}
}

//         "id": "1",
//         "standId": "4",
//         "userId": "a81699b9-94d1-4f72-9df4-1588dc1b2cc5",
//         "beginDate": "2025-12-23T18:00:00",
//         "duration": "120"


export default {
    addComment, getComments
}
