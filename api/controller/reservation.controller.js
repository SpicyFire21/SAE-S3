import reservationService from "../services/reservation.service.js";


export const getReservations = async (req,res) => {
    try {
        let data = await reservationService.getReservations();
        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des reservations");
    }
}