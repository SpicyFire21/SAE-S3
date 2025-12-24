import {autographs_reservations, films, films_reservations, projections, reservations} from "@/datasource/data.js";
import {v4 as uuidv4} from 'uuid'

async function getReservations() {
    return {error:0, status:200, data:reservations}
}

async function getFilmsReservations() {
    return {error:0, status:200, data:films_reservations}
}

async function getAutographReservations() {
    return {error:0, status:200, data:autographs_reservations}
}
async function addFilmReservation(data) {
    const reservation = {
        id: uuidv4(),
        userId: data.userId,
        type: data.type,
        date: data.date,
        standId: data.standId
    }

    const filmReservation = {
        reservationId: reservation.id,
        projectionId: data.projectionId
    }

    return {error: 0, status: 201, data: {reservation, filmReservation}}
}
async function getFilmFromReservation(reservation) {
    if (reservation.type !== 'film') {
        return { error: 1, status: 400, data: 'Ce n’est pas une réservation de film' };
    }

    // cherche la réservation film correspondante
    const filmRes = films_reservations.find(fr => fr.reservationId === reservation.id);
    if (!filmRes) {
        return { error: 1, status: 404, data: 'Réservation film introuvable' };
    }

    // cherche la projection correspondante
    const projection = projections.find(p => p.id === filmRes.projectionId);
    if (!projection) {
        return { error: 1, status: 404, data: 'Projection introuvable' };
    }

    // cherche le film correspondant
    const film = films.find(f => f.id === projection.filmId);
    if (!film) {
        return { error: 1, status: 404, data: 'Film introuvable' };
    }

    return { error: 0, status: 200, data: film };
}
async function getReservationByIdUser(id) {
    const reservationsForUser = reservations.filter(r => r.userId.includes(id))
    return { error: 0, status:200, data: reservationsForUser}
}

export default {
    getReservations,
    getFilmsReservations,
    getAutographReservations,
    addFilmReservation,
    getReservationByIdUser,
    getFilmFromReservation,
}
