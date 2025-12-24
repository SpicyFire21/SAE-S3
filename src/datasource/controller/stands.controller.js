import {stands, standTypes} from "@/datasource/data.js";

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

export default {
    getStands,
    getStandsTypes,
    getStandById
}