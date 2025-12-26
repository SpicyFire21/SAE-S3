import ticketsService from "../services/ticket.service.js";


export const getBilletsByUserId = async (req,res) => {
    try {
        let data = await ticketsService.getBilletsByUserId(req.params.iduser);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des billets de l'utilisateur");
    }
}

export const getTicketsPrice = async (req,res) => {
    try {
        let data = await ticketsService.getTicketsPrice();

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des tarifs des billets");
    }
}

export const createTicket = async (req,res) => {
    try {
        let data = await ticketsService.createTicket(req.body);

        return res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la création du billet");
    }
}









