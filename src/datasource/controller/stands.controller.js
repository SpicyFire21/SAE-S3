import {goodies_size, stand_reservations_requests, stands, standTypes,} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'

async function getStands() {
    return {error:0, status:200, data:stands}
}

async function getStandsTypes() {
    return {error:0, status:200, data:standTypes}
}
async function getStandById(id) {
    const stand = stands.find(s => s.idstand === id)
    return { error: 0, status: 200, data: stand }
}

async function getStandTypeById(id) {
    const typeStand = standTypes.find(ts => ts.id === id)
    return { error: 0, status: 200, data: typeStand }
}

async function getStandsReservationsRequests() {
    return {error: 0, status: 200, data: stand_reservations_requests}
}

async function addStandRequest(data) {
    const standReservationRequest = {
        id: uuidv4(),
        standId: data.standId,
        requestDate: new Date(),
        userId: data.userId,
        status: data.status,
    }

    stand_reservations_requests.push(standReservationRequest)

    return { error: 0, status:200, data: standReservationRequest}
}

export default {
    getStands,
    getStandsTypes,
    getStandById,
    getStandTypeById,
    getStandsReservationsRequests,
    addStandRequest
}