import {
    autographs,
    autographs_reservations,
    films,
    films_reservations,
    projections,
    reservations
} from "@/datasource/data.js";
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

    reservations.push(reservation)
    films_reservations.push(filmReservation)

    return {error: 0, status: 201, data: {reservation, filmReservation}}
}

async function addAutographReservation(data) {
    const reservation = {
        id: uuidv4(),
        userId: data.userId,
        type: data.type,
        date: data.date,
        standId: data.standId
    }

    const autographReservation = {
        reservationId: reservation.id,
        autographId: data.autographId
    }

    reservations.push(reservation)
    films_reservations.push(autographs_reservations)

    return {error: 0, status: 201, data: {reservation, autographReservation}}
}
async function getEventFromReservation(reservation) {
    if (reservation.type === '1') {
        // FILM
        const filmRes = films_reservations.find(fr => fr.reservationId === reservation.id);
        if (!filmRes) return { error: 1, status: 404, data: 'Réservation film introuvable' };

        const projection = projections.find(p => p.id === filmRes.projectionId);
        if (!projection) return { error: 1, status: 404, data: 'Projection introuvable' };

        const film = films.find(f => f.id === projection.filmId);
        if (!film) return { error: 1, status: 404, data: 'Film introuvable' };

        return { error: 0, status: 200, type: 'film', data: film };
    } else if (reservation.type === '2') {
        // AUTOGRAPH
        const autographRes = autographs_reservations.find(ar => ar.reservationId === reservation.id);
        if (!autographRes) return { error: 1, status: 404, data: 'Réservation autograph introuvable' };

        const autograph = autographs.find(a => a.id === autographRes.autographId);
        if (!autograph) return { error: 1, status: 404, data: 'Autograph introuvable' };

        return { error: 0, status: 200, type: 'autograph', data: autograph };
    } else {
        return { error: 1, status: 400, data: 'Type de réservation inconnu' };
    }
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
    getEventFromReservation,
    addAutographReservation
}
