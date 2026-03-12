import reservationService from "../services/reservation.service.js";
import filmService from "../services/film.service.js";


export const getReservations = async (req,res) => {
    try {
        let data = await reservationService.getReservations();
        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des reservations");
    }
}

export const addFilmReservation = async (req,res) => {
    try {
        let data = await filmService.addFilmReservation(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de la reservation de film");
    }
}
